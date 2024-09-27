import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import Category from "./Category";

// defines the object with its attributes and methods
// implements clause is only a check that the class can be treated as the interface type - it doesn’t change the type of the class or its methods
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

  // () => Category = Many lps to One Category
  // inverse side => (category) => category.lps = one category is linked to many lps
  @ManyToOne(() => Category, (category) => category.lps)
  category!: Category;

  // constructor defines which attributes are mandatory when a new object is created and uses the TypeLp defined above to ensure correct types are used
  constructor(lp?: Partial<Lp>) {
    super(); // super() marks the inheritance of the BaseEntity class
    if (lp) {
      // !lp... enforces the non-nullable property of fields below
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
    lpData: Partial<Lp> & { categoryId?: number }
  ): Promise<Lp> {
    // Partial indicates that some properties are optional
    // categoryId? is not mandatory
    // Promise indicates the completion of an asynchronous operation
    const newLp = new Lp(lpData); // new object Lp is created with the data received which is checked by entity logic (type, constructor)

    // if categoryId is indicated, it is recovered and applied as a property to the new object via the variable category
    if (lpData.categoryId) {
      const category = await Category.getCategoryById(lpData.categoryId);
      newLp.category = category;
    }

    const savedLp = await newLp.save(); // pushes the new data to the database - save is a method of the model

    console.log(`New Lp created: ${savedLp.getStringRepresentation()}.`);

    return savedLp;
  }

  // returns an array of items
  static async getAllLps(): Promise<Lp[]> {
    // constructor must indicate lp? in case there are no existing values to return
    // finding an array of lps with find takes argument which is the relation to the entity
    const lps = await Lp.find({ relations: { category: true } }); // find is a method of the model

    return lps;
  }

  // returns an item
  static async getLpById(id: number): Promise<Lp> {
    // finding a lp with findOne takes two arguments : where (id) and relations to the entity
    const lp = await Lp.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!lp) {
      throw new Error(`Lp with ID ${id} does not exist.`);
    }

    return lp;
  }

  getStringRepresentation(): string {
    return `${this.artist} - ${this.title}`;
  }

  static async deleteLp(id: number): Promise<void> {
    const { affected } = await Lp.delete(id); // { affected } represents any number of rows affected by the query - delete is a method of the model

    if (affected === 0) {
      throw new Error(`Lp with ID ${id} does not exist.`);
    }
  }

  // updates the item thanks to a sequence of three different functions (entity getLpById - model update - model reload)
  static async updateLp(id: number, partialLp: Partial<Lp>): Promise<Lp> {
    // uses as parameters the id and the (partial) data received
    const lp = await Lp.getLpById(id); // uses the entity method to save time

    await Lp.update(id, partialLp); // updates the Lp object in database - update is a method of the model

    await lp.reload(); // reloads entity data from the database

    return lp;
  }
}

export default Lp;
