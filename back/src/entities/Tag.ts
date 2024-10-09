import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Lp from "./Lp";
import { ArgsType, Field, ID, ObjectType } from "type-graphql";
import { MinLength } from "class-validator";

@Entity()
@ObjectType()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column({ unique: true })
  @Field()
  title!: string;

  @ManyToMany(() => Lp, (lp) => lp.tags)
  @Field(() => [Lp])
  lps!: Lp[];

  constructor(tag?: Partial<Tag>) {
    super();

    if (tag) {
      if (!tag.title) {
        throw new Error("Tag title must not be empty.");
      }
      this.title = tag.title;
    }
  }

  static async saveNewTag(tagData: CreateOrUpdateTag): Promise<Tag> {
    if (!tagData.title) {
      throw new Error("Tag title must not be empty.");
    }

    const existingTag = await Tag.getTagByTitle(tagData.title);
    if (existingTag) {
      throw Error(`Tag with name "${tagData.title}" already exists.`);
    }

    const newtag = new Tag(tagData);
    const savedTag = await Tag.save(newtag);

    console.log(`New tag saved: ${savedTag.getStringRepresentation()}.`);

    return savedTag;
  }

  static async getAllTags(): Promise<Tag[]> {
    const tags = await Tag.find();
    return tags;
  }

  static async getTagById(id: string): Promise<Tag> {
    const tag = await Tag.findOneBy({ id });

    if (!tag) {
      throw new Error(`Tag with ID ${id} doesn't exist.`);
    }
    return tag;
  }

  private static async getTagByTitle(title: string): Promise<Tag | null> {
    const tag = await Tag.findOneBy({ title });
    return tag;
  }

  static async deleteTag(id: string): Promise<Tag> {
    const tag = await Tag.getTagById(id);
    await Tag.delete(id);
    return tag;
  }

  static async updateTag(
    id: string,
    partialTag: CreateOrUpdateTag
  ): Promise<Tag> {
    const tag = await Tag.getTagById(id);
    await Tag.update(id, partialTag);
    await tag.reload();
    return tag;
  }

  getStringRepresentation(): string {
    return `${this.id} - ${this.title}`;
  }
}

export default Tag;

@ArgsType()
export class CreateOrUpdateTag {
  @Field()
  @MinLength(2)
  title!: string;
}
