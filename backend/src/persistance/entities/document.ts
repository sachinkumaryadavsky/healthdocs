import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("documents")
export class Document {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  filename!: string;

  @Column()
  filepath!: string;

  @Column()
  filesize!: number;

  @CreateDateColumn()
  created_at!: Date;
}
