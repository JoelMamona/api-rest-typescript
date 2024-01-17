import { Column, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disciplina } from "./Disciplina";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

@Entity('professores')
export class Professor {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @IsNotEmpty({message: 'O campo nome é obrigatório'})
    @IsString({message: 'O campo nome é do tipo String'})
    nome: string

    @Column()
    @IsNotEmpty({message: 'O campo morada é obrigatório'})
    @IsString({message: 'O campo morada é do tipo String'})
    morada: string

    @Column()
    @IsNotEmpty({message: 'O campo bi é obrigatório'})
    @IsString({message: 'O campo bi é do tipo String'})
    bi: string

    @Column({default: true})
    @IsNotEmpty({message: 'O campo morada é obrigatório'})
    @IsBoolean({message: 'O campo licenciado é do tipo boolean'})
    licenciado: Boolean

    @Column({type:'date'})
    @IsNotEmpty({message: 'O campo morada é obrigatório'})
    dob: Date

    @OneToMany(() => Disciplina, disciplina => disciplina.professor)
    @JoinColumn({ name: 'disciplina_id' })
    disciplinas: Disciplina[]
}