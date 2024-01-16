import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disciplina } from "./Disciplina";

@Entity('professores')
export class Professor {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar'})
    nome: string

    @Column({type:'varchar'})
    morada: string

    @Column({type:'varchar', length:15})
    bi: string

    @Column({type:'boolean', default: true})
    licenciado: Boolean

    @Column({type:'date'})
    dob: Date

    @OneToMany(() => Disciplina, disciplina => disciplina.professor)
    @JoinColumn({ name: 'disciplina_id' })
    disciplinas: Disciplina[]
}