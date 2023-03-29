import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('content')
export class ContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  imageUrl: string;

  @Column('text')
  approvalStatus: string;
}
