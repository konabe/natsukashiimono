import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('score')
export class ScoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contentId: number;

  @Column({ type: 'varchar', length: 36 })
  userId: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
