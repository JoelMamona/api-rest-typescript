import { Request, Response } from "express";
import { DisciplinaRepository as disciplinaRepository } from "../repositories/DisciplinaRepository";

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

        const disciplina = await disciplinaRepository.findOneBy({ id: Number(id)})

        if (!disciplina)
            return res.status(404).json({ message:'A Disciplina não existe'})

        const newItem = await disciplinaRepository.update(id,{nome, descricao});
        return res.status(200).json(newItem)
    }

    async create(req:Request, res: Response){

        const {nome, descricao} = req.body

        if (!nome)
            return res.status(400).json({ message:'O nome é obrigatório'})
        if (!descricao)
            return res.status(400).json({ message:'A descricao é obrigatória'})

        try {
            const newDisciplina= disciplinaRepository.create({nome, descricao})
            await disciplinaRepository.save(newDisciplina)
            return res.status(201).json(newDisciplina)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message:'Internal Server Error'})
        }
    }
    
}