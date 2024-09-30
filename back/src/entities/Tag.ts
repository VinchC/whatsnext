import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Lp from "./Lp";

@Entity()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  title!: string;

  @ManyToMany(() => Lp, (lp) => lp.tags)
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

  static async saveNewTag(tagData: Partial<Tag>): Promise<Tag> {
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

  private static async getTagByTitle(title: string): Promise<Tag | null> {
    const tag = await Tag.findOneBy({ title });
    return tag;
  }

  getStringRepresentation(): string {
    return `${this.id} - ${this.title}`;
  }

  static async getAllTags(): Promise<Tag[]> {
    const tags = await Tag.find();
    return tags;
  }

  static async getTagById(id: number): Promise<Tag> {
    const tag = await Tag.findOneBy({ id });

    if (!tag) {
      throw new Error(`Tag with ID ${id} doesn't exist.`);
    }
    return tag;
  }

  static async deleteTag(id: number): Promise<void> {
    const { affected } = await Tag.delete(id);

    if (affected === 0) {
      throw new Error(`Tag with ID ${id} doesn't exist.`);
    }
  }

  static async updateTag(id: number, partialTag: Partial<Tag>): Promise<Tag> {
    const tag = await Tag.getTagById(id);
    await Tag.update(id, partialTag);
    await tag.reload();
    return tag;
  }
}

export default Tag;
