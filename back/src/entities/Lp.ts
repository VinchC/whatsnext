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
import { ArgsType, Field, Float, ID, Int, ObjectType } from "type-graphql";

@Entity()
@ObjectType() // allows the object to have a corresponding part in the GraphQL schema
class Lp extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") // ORM decorator
  @Field(() => ID) // GraphQL decorator
  id!: string;

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
  @Field(() => Category)
  category!: Category;

  @JoinTable({ name: "lps_tags" })
  @ManyToMany(() => Tag, (tag) => tag.lps, { eager: true })
  @Field(() => [Tag])
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

  //updates the method with the CreateLp type and its related fields if necessary
  static async saveNewLp(lpData: CreateOrUpdateLp): Promise<Lp> {
    const newLp = new Lp(lpData);
    if (lpData.categoryId) {
      const category = await Category.getCategoryById(lpData.categoryId);
      newLp.category = category;
    }

    if (lpData.tagIds) {
      newLp.tags = await Promise.all(lpData.tagIds.map(Tag.getTagById));
    }

    const savedLp = await newLp.save();

    console.log(`New Lp created: ${savedLp.getStringRepresentation()}.`);

    return savedLp;
  }

  static async getAllLps(categoryId?: number): Promise<Lp[]> {
    const lps = await Lp.find({
      where: { category: { id: categoryId } },
      order: { createdAt: "DESC" },
    });

    return lps;
  }

  static async getLpById(id: string): Promise<Lp> {
    const lp = await Lp.findOne({
      where: { id },
    });

    if (!lp) {
      throw new Error(`Lp with ID ${id} does not exist.`);
    }

    return lp;
  }

  static async deleteLp(id: string): Promise<void> {
    const { affected } = await Lp.delete(id);

    if (affected === 0) {
      throw new Error(`Lp with ID ${id} does not exist.`);
    }
  }

  static async updateLp(
    id: string,
    partialLp: CreateOrUpdateLp): Promise<Lp> {
    const lp = await Lp.getLpById(id);

    Object.assign(lp, partialLp);

    if (partialLp.categoryId) {
      lp.category = await Category.getCategoryById(partialLp.categoryId);
    }

    if (partialLp.tagIds) {
      lp.tags = await Promise.all(partialLp.tagIds.map(Tag.getTagById));
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

// defined a CreateLp class that will be used by the entity resolver to create a new item
@ArgsType()
export class CreateOrUpdateLp {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description!: string;

  @Field()
  artist!: string;

  @Field(() => Float, { nullable: true })
  price!: number;

  @Field({ nullable: true })
  picture!: string;

  @Field({ nullable: true })
  label!: string;

  @Field(() => Int)
  categoryId!: number;

  @Field(() => [String], { nullable: true })
  tagIds!: string[];
}
