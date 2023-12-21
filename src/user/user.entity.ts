import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user'})
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  email: string;
  
  @Column({ length: 500 })
  firstname: string;

  @Column({ length: 500 })
  lastname: string;

  @Column()
  password: string;

  @Column({nullable: true})
  refreshToken: string;

  // @Column()
  // salt: string;

  // setPassword(newPassword: string): Record<string,string> {
  //   // Generate a random salt
    
  //   const salt = bcrypt.genSaltSync();
    
  //   // Hash the password with the generated salt
  //   this.password = bcrypt.hashSync(newPassword, salt);
    
  // }

  // checkPassword(password: string): boolean {
  //   // Hash the provided password with the stored salt and compare with the stored hashed password
  //   const hashedPassword = bcrypt.hashSync(password, this.salt);
  //   return this.password === hashedPassword;
  // }

  @Column()
  createdAt: string;

//   @Column()
//   filename: string;

//   @Column('int')
//   views: number;

//   @Column()
//   isPublished: boolean;
}