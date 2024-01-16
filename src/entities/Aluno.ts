import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disciplina } from "./Disciplina";

@Entity('alunos')
export class Aluno {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar'})
    nome: string

    @Column({type:'varchar'})
    morada: string

    @Column({type:'date'})
    dob: Date

    @ManyToMany(() => Disciplina, (disciplina) => disciplina.alunos)
    disciplinas: Disciplina[]
}