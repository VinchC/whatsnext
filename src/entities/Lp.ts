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
  constructor(lp: TypeLp) {
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

  // getAllLps() {}

  // getLpById(id: number) {}

  // createLp() {}

  // deleteLp(id: number) {}

  // updateLp(id: number) {}
}

export default Lp;
