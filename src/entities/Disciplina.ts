import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Aluno } from "./Aluno";
import { Professor } from "./Professor";
import { IsNotEmpty, IsString } from "class-validator";

@Entity('disciplinas')
export class Disciplina {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @IsNotEmpty({message: 'O campo nome é obrigatório'})
    @IsString({message: 'O campo nome é do tipo String'})
    nome: string

    @Column()
    @IsNotEmpty({message: 'O campo descricao é obrigatório'})
    @IsString({message: 'O campo descricao é do tipo String'})
    descricao: string

    @ManyToMany(() => Aluno, aluno => aluno.disciplinas)
    @JoinTable({
        
        name:"disciplina_aluno",
        joinColumn:{
            name:"disciplina_id",
            referencedColumnName:"id"
        },
        inverseJoinColumn:{
            name:"aluno_id",
            referencedColumnName:"id"
        }
    })
    alunos: Aluno[]

    @ManyToOne(() => Professor)
    professor: Professor

}