import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  email: string;
  
  @Column({ length: 500 })
  firstname: string;

  @Column({ length: 500 })
  lastname: string;


//   @Column('text')
//   description: string;

//   @Column()
//   filename: string;

//   @Column('int')
//   views: number;

//   @Column()
//   isPublished: boolean;
}