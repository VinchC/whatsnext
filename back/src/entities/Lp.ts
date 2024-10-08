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
import { Field, Float, ID, ObjectType } from "type-graphql";

@Entity()
@ObjectType() // allows the object to have a corresponding part in the GraphQL schema
class Lp extends BaseEntity {
  @PrimaryGeneratedColumn() // ORM decorator
  @Field(() => ID) // GraphQL decorator
  id!: number;

  @Column({ length: 150 })
  @Field()
  title!: string;

  @Column({ default: "" })
  @Field()
  description!: string;

  @Column({ length: 150 })
  @Field()
  artist!: string;

  @Column({ nullable: true }) // why is it implemented twice ?
  @Field(() => Float, { nullable: true })
  price!: number;

  @Column({ default: "" })
  @Field()
  picture!: string;

  @Column({ length: 150, default: "" })
  @Field()
  label!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @ManyToOne(() => Category, (category) => category.lps, { eager: true })
  category!: Category;

  @JoinTable({ name: "lps_tags" })
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

      if (lp.price) {
        this.price = lp.price;
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
    lpData: Partial<Lp> & { category?: number; tags?: number[] }
  ): Promise<Lp> {
    const newLp = new Lp(lpData);
    if (lpData.category) {
      const category = await Category.getCategoryById(lpData.category);
      newLp.category = category;
    }

    if (lpData.tags) {
      newLp.tags = await Promise.all(lpData.tags.map(Tag.getTagById));
    }

    const savedLp = await newLp.save();

    console.log(`New Lp created: ${savedLp.getStringRepresentation()}.`);

    return savedLp;
  }

  static async getAllLps(categoryId?: number): Promise<Lp[]> {
    const lps = await Lp.find({ where: { category: { id: categoryId } }, order: { createdAt: "DESC"} });

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
    partialLp: Partial<Lp> & { category?: number; tags?: number[] }
  ): Promise<Lp> {
    const lp = await Lp.getLpById(id);

    Object.assign(lp, partialLp);

    if (partialLp.category) {
      await Category.getCategoryById(partialLp.category);
    }

    if (partialLp.tags) {
      lp.tags = await Promise.all(partialLp.tags.map(Tag.getTagById));
    }

    await lp.save();

    lp.reload();

    return lp;
  }

  getStringRepresentation(): string {
    return `${this.artist} - ${this.title}`;
  }
}

export default Lp;
