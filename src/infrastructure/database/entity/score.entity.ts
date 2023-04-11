import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('score')
export class ScoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contentId: number;

  @Column({ type: 'varchar', length: 36 })
  userId: string;
}
