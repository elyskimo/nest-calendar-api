import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToMany,
    ManyToOne,  
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { User } from "src/user/user.entity";

@Entity({ name: 'event'})
export class Event {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
  
    @Column({ length: 500, nullable: false })
    title: string;
    
    @Column({ nullable: true })
    description: string;
  
    @Column({ type: 'datetime', nullable: false })
    startDateTime: Date;
  
    @Column({ type: 'datetime', nullable: false })
    endDateTime: Date;

    @Column({ nullable: true })
    color: string;
  
    @Column({ nullable: true })
    icon: string;

    @Column({ default: 0 })
    importance: number;

    // @ManyToMany(() => TagEntity)
    // @JoinTable()
    // tags: TagEntity[];
  
    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user_id' })
    userId: User;
  
    // @ManyToOne(() => EventCategoryEntity, category => category.events)
    // @JoinColumn({ name: 'category_id' })
    // category: EventCategoryEntity;
  
    @Column({ type: 'json', nullable: true })
    recurrence: Record<string, any>;
  
    @CreateDateColumn({ type: 'datetime' }) // Automatically set on creation
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'datetime' }) // Automatically set on update
    updatedAt: Date;
}
