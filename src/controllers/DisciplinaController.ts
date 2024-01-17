import { Request, Response } from "express";
import { DisciplinaRepository as disciplinaRepository } from "../repositories/DisciplinaRepository";
import {plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Disciplina } from "../entities/Disciplina";

export class DisciplinaController {

    async index(req:Request, res: Response){
        const disciplinas = await disciplinaRepository.find({
            relations: ['professor','alunos']
        })
        return res.status(200).json(disciplinas)
    }

    async show(req:Request, res: Response){
        const id = req.params.id
        const disciplina = await disciplinaRepository.findOneBy({ id: Number(id)})
        return res.status(200).json(disciplina)
    }

    async destroy(req:Request, res: Response){
        const id = req.params.id
        const disciplina = await disciplinaRepository.findOneBy({ id: Number(id)})

        if (!disciplina)
            return res.status(404).json({ message:'A Disciplina não existe'})
        
        await disciplinaRepository.delete(id)
        return res.status(200)
    }

    async update(req:Request, res: Response){

        const {nome, descricao} = req.body
        const id = req.params.id
        const data = plainToInstance(Disciplina, req.body);
        const errors = await validate(data)

        const disciplina = await disciplinaRepository.findOneBy({ id: Number(id)})

        if (!disciplina)
            return res.status(404).json({ message:'A Disciplina não existe'})

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

        const newItem = await disciplinaRepository.update(id,{nome, descricao});
        return res.status(200).json(newItem)
    }

    async create(req:Request, res: Response){

        const {nome, descricao} = req.body
        const disciplina = plainToInstance(Disciplina, req.body);
        const errors = await validate(disciplina)
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
            const newDisciplina= disciplinaRepository.create({nome, descricao})
            await disciplinaRepository.save(newDisciplina)
            return res.status(201).json(newDisciplina)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message:'Internal Server Error'})
        }
    }
    
}