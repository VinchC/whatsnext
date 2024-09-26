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

  // constructor defines which attributes are mandatory when a new object is created
  constructor(id: number, title: string, artist: string) {
    super(); // super() marks the inheritance of the BaseEntity class
    this.id = id;
    this.title = title;
    this.artist = artist;
  }

  getAllLps() {}

  getLpById(id: number) {}

  createLp() {}

  deleteLp(id: number) {}

  updateLp(id: number) {}
}

export default Lp;
