import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Lp from "./Lp";

@Entity()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  title!: string;

  // () => Lp = a category is linked to many lps
  // inverse side => one lp is linked to one category
  @OneToMany(() => Lp, (lp) => lp.category)
  lps!: Lp[];

  constructor(category?: Partial<Category>) {
    super();

    // !lp... enforces the non-nullable property of fields below
    if (category) {
      if (!category.title) {
        throw new Error("Category title cannot be empty.");
      }
      this.title = category.title;
    }
  }

  static async saveNewCategory(
    categoryData: Partial<Category>
  ): Promise<Category> {
    //Partial<Category> will allow to check the existing or empty title value

    if (!categoryData.title) {
      throw new Error("Category title cannot be empty.");
    }

    // checks via private method that a category with this title doesn't already exist
    const existingCategory = await Category.getCategoryByTitle(
      categoryData.title
    );
    if (existingCategory) {
      return existingCategory;
    }

    const newCategory = new Category(categoryData);
    const savedCategory = await newCategory.save();

    console.log(
      `New category saved: ${savedCategory.getStringRepresentation()}.`
    );

    return savedCategory;
  }

  // private means that this method will only be used by this class
  private static async getCategoryByTitle(
    title: string
  ): Promise<Category | null> {
    const category = await Category.findOneBy({ title });
    return category;
  }

  getStringRepresentation(): string {
    return `${this.id} - ${this.title}`;
  }

  static async getAllCategories(): Promise<Category[]> {
    const categories = await Category.find();
    return categories;
  }

  static async getCategoryById(id: number): Promise<Category> {
    const category = await Category.findOneBy({ id });

    if (!category) {
      throw Error(`Category with ${id} doesn't exist.`);
    }
    return category;
  }

  static async deleteCategory(id: number): Promise<void> {
    const { affected } = await Category.delete(id);

    if (affected === 0) {
      throw Error(`Category with ${id} doesn't exist.`);
    }
  }

  static async updateCategory(
    id: number,
    partialCategory: Partial<Category>
  ): Promise<Category> {
    const category = await Category.getCategoryById(id);
    await Category.update(id, partialCategory);
    await category.reload();
    return category;
  }
}

export default Category;
