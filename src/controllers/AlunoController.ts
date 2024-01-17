import { Request, Response } from "express";
import {AlunoRepository as alunoRepository } from "../repositories/AlunoRepository";
import { DisciplinaRepository as disciplinaRepository } from '../repositories/DisciplinaRepository';
import {plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Aluno } from "../entities/Aluno";


export class AlunoController {

    async index(req:Request, res: Response){
        const alunos = await alunoRepository.find({
            relations: ['disciplinas']
        })
        return res.status(200).json(alunos)
    }

    async show(req:Request, res: Response){
        const id = req.params.id
        const aluno = await alunoRepository.findOneBy({ id: Number(id)})

        return res.status(200).json(aluno)
    }

    async destroy(req:Request, res: Response){

        const id = req.params.id
        const aluno = await alunoRepository.findOneBy({ id: Number(id)})

        if (!aluno)

            return res.status(404).json({ message:'O aluno não existe'})
        return await alunoRepository.delete(id)
    }

    async update(req:Request, res: Response){

        const {nome, morada,dob} = req.body
        const id = req.params.id
        const data = plainToInstance(Aluno, req.body);
        const errors = await validate(data)

        const aluno = await alunoRepository.findOneBy({ id: Number(id)})

        if (!aluno)
            return res.status(404).json({ message:'Aluno não existe'})

        if (errors.length > 0) {
                let errorsArray = [];
                for (let index = 0; index < errors.length; index++) {
                    const errorObject = {
                        field: errors[index].property,
                        messages: errors[index]["constraints"]
                    };
                    errorsArray.push(errorObject);
                }
                return res.status(400).json({ errors: errorsArray });
        }
        const newItem = await alunoRepository.update(id,{nome, morada,dob});
        return res.status(200).json(newItem)

    }


    async create(req:Request, res: Response){

        const {nome, morada,dob} = req.body
        const {disciplina_id} = req.params
        const aluno = plainToInstance(Aluno, req.body);
        const errors = await validate(aluno)
        const disciplina = await disciplinaRepository.findOneBy({ id: Number(disciplina_id)})

        if (!disciplina) return res.status(404).json({ message:'A disciplina não existe'})
        
        try {

            if (errors.length > 0) {
                let errorsArray = [];
                for (let index = 0; index < errors.length; index++) {
                    const errorObject = {
                        field: errors[index].property,
                        messages: errors[index]["constraints"]
                    };
                    errorsArray.push(errorObject);
                }
                return res.status(400).json({ errors: errorsArray });
            }
            const newAluno= alunoRepository.create({nome, morada, dob, disciplinas: [disciplina]})
            await alunoRepository.save(newAluno)
            return res.status(201).json(newAluno)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message:'Internal Server Error'})
        }
    }
}