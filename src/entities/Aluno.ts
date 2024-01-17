import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Disciplina } from "./Disciplina";
import { IsNotEmpty, IsString} from "class-validator"

@Entity('alunos')
export class Aluno {

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
    @IsNotEmpty({message: 'O campo dob é obrigatório'})
    @IsString({message: 'O campo dob é do tipo String'})
    dob: string

    @ManyToMany(() => Disciplina, (disciplina) => disciplina.alunos)
    disciplinas: Disciplina[]

}