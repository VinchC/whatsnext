import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  title!: string;

  constructor(category?: Category) {
    super();
    if (category) {
      this.title = category.title;
    }
  }

  static async saveNewCategory(categoryData: any): Promise<Category> {
    const newCategory = new Category(categoryData);
    const savedCategory = await newCategory.save();
    return savedCategory;
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
