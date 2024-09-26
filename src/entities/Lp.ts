import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

// definition of the type of the data expected for an Lp object
export type TypeLp = {
  id: number;
  title: string;
  description?: string;
  artist: string;
  release_year?: number;
  picture?: string;
  label?: string;
  createdAt?: Date;
};

// defines the object with its attributes and methods
// implements clause is only a check that the class can be treated as the interface type - it doesn’t change the type of the class or its methods
@Entity()
class Lp extends BaseEntity implements TypeLp {
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

  // constructor defines which attributes are mandatory when a new object is created and uses the TypeLp defined above to ensure correct types are used
  constructor(lp?: TypeLp) {
    super(); // super() marks the inheritance of the BaseEntity class
    if (lp) {
      this.title = lp.title;
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

  // returns an array of items
  static async getAllLps(): Promise<Lp[]> {
    // constructor must indicate lp? in case there are no existing values to return
    const lps = await Lp.find();

    return lps;
  }

  // getLpById(id: number) {}

  getStringRepresentation(): string {
    return `${this.artist} - ${this.title}`;
  }

  static async saveNewLp(lpData: any): Promise<Lp> {
    // Promise indicates the completion of an asynchronous operation
    const newLp = new Lp(lpData); // new object Lp is created with the data received which is checked by entity logic (type, constructor)

    const savedLp = await newLp.save(); // pushes the new data to the database - save is a method of the model

    console.log(`New Lp created: ${savedLp.getStringRepresentation()}.`);
    return savedLp;
  }

  static async deleteLp(id: number): Promise<void> {
    const { affected } = await Lp.delete(id); // { affected } represents any number of rows affected by the query - delete is a method of the model

    if (affected === 0) {
      throw new Error(`Lp with ID ${id} does not exist.`);
    }
  }

  // updateLp(id: number) {}
}

export default Lp;
