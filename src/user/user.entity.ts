import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user'})
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 500 })
  email: string;
  
  @Column({ length: 500 })
  firstname: string;

  @Column({ length: 500 })
  lastname: string;

  @Column()
  createdAt: string;

//   @Column()
//   filename: string;

//   @Column('int')
//   views: number;

//   @Column()
//   isPublished: boolean;
}