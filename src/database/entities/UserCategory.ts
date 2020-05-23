import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';
import Category from './Category';

@Entity('users_categories')
export default class UserCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  user_id: number;

  @ManyToOne(() => User, user => user.user_category)
  @JoinColumn({ name: 'user_id' })
  user: User;

  category_id: number;

  @ManyToOne(() => Category, category => category.user_category, {
    cascade: ['insert'],
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
