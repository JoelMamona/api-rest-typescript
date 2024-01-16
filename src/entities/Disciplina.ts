import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Aluno } from "./Aluno";
import { Professor } from "./Professor";

@Entity('disciplinas')
export class Disciplina {

    @PrimaryGeneratedColumn()
    id:number

    @Column({type:'varchar'})
    nome: string

    @Column({type:'varchar', nullable:true})
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