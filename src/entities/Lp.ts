import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Category from "./Category";
import Tag from "./Tag";

@Entity()
class Lp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column({ default: "" })
  description!: string;

  @Column({ length: 150 })
  artist!: string;

  @Column({ nullable: true })
  release_year!: number;

  @Column({ default: "" })
  picture!: string;

  @Column({ length: 150, default: "" })
  label!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Category, (category) => category.lps, { eager: true })
  category!: Category;

  @JoinTable({ name: "lps_tags" }) // will create the join table - decorator should be put on only one of the two entities related
  @ManyToMany(() => Tag, (tag) => tag.lps, { eager: true })
  tags!: Tag[];

  constructor(lp?: Partial<Lp>) {
    super();
    if (lp) {
      if (!lp.title) {
        throw new Error("Title must not be empty.");
      }
      this.title = lp.title;

      if (!lp.artist) {
        throw new Error("Artist must not be empty.");
      }
      this.artist = lp.artist;

      if (lp.description) {
        this.description = lp.description;
      }

      if (lp.release_year) {
        this.release_year = lp.release_year;
      }

      if (lp.picture) {
        this.picture = lp.picture;
      }

      if (lp.label) {
        this.label = lp.label;
      }
    }
  }

  static async saveNewLp(
    lpData: Partial<Lp> & { category?: number; tags?: [] } // gets the possible tag(s) if any
  ): Promise<Lp> {
    const newLp = new Lp(lpData);
    if (lpData.category) {
      const category = await Category.getCategoryById(lpData.category);
      newLp.category = category;
    }

    // Two ways : first one is longer
    // const associatedTags = [];
    // create an empty array that will register the tag(s) of the item

    if (lpData.tags) {
      //   creates a loop that will get the possible tag ids which will be pushed in the dedicated array
      //   for (const tagId of lpData.tags) {
      //     const tag = await Tag.getTagById(tagId);
      //     associatedTags.push(tag);
      //   }

      // Second way
      // Promise.all will call each function in the array and resolve when all are resolved
      // In that case it will map each tag
      newLp.tags = await Promise.all(lpData.tags.map(Tag.getTagById));
    }

    const savedLp = await newLp.save();

    console.log(`New Lp created: ${savedLp.getStringRepresentation()}.`);

    return savedLp;
  }

  static async getAllLps(): Promise<Lp[]> {
    const lps = await Lp.find();

    return lps;
  }

  static async getLpById(id: number): Promise<Lp> {
    const lp = await Lp.findOne({
      where: { id },
    });

    if (!lp) {
      throw new Error(`Lp with ID ${id} does not exist.`);
    }

    return lp;
  }

  static async deleteLp(id: number): Promise<void> {
    const { affected } = await Lp.delete(id);

    if (affected === 0) {
      throw new Error(`Lp with ID ${id} does not exist.`);
    }
  }

  static async updateLp(
    id: number,
    partialLp: Partial<Lp> & { category?: number }
  ): Promise<Lp> {
    const lp = await Lp.getLpById(id);

    if (partialLp.category) {
      await Category.getCategoryById(partialLp.category);
    }

    await Lp.update(id, partialLp);

    await lp.reload();

    return lp;
  }

  getStringRepresentation(): string {
    return `${this.artist} - ${this.title}`;
  }
}

export default Lp;
