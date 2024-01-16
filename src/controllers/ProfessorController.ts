
import { Request, Response } from "express";
import {ProfessorRepository as professorRepository } from "../repositories/ProfessorRepository";
import { DisciplinaRepository as  disciplinaRepository } from "../repositories/DisciplinaRepository";


export class ProfessorController {

    async index(req:Request, res: Response){
        const professores = await professorRepository.find({
            relations: ['disciplinas']
        })
        return res.status(200).json(professores)
    }

    async show(req:Request, res: Response){
        const id = req.params.id
        const professor = await professorRepository.findOneBy({ id: Number(id)})
        return res.status(200).json(professor)
    }

    async destroy(req:Request, res: Response){

        const id = req.params.id
        const professor = await professorRepository.findOneBy({ id: Number(id)})
        if (!professor)
            return res.status(404).json({ message:'O professor não existe'})
        return await professorRepository.delete(id)
    }

    async update(req:Request, res: Response){

        const {nome, morada,dob, bi, licenciado} = req.body
        const id = req.params.id

        const professor = await professorRepository.findOneBy({ id: Number(id)})

        if (!professor)
            return res.status(404).json({ message:'O professor não existe'})

        const newItem = await professorRepository.update(id,{nome, morada, dob, bi, licenciado});
        return res.status(200).json(newItem)
    }


    async create(req:Request, res: Response){

        const {nome, morada,dob, bi,licenciado} = req.body
        const {disciplina_id} = req.params

        if (!disciplina_id)
            return res.status(400).json({ message:'O disciplina_id é obrigatório'})
        if (!nome)
            return res.status(400).json({ message:'O nome é obrigatório'})
        if (!morada)
            return res.status(400).json({ message:'A morada é obrigatório'})
        if (!dob)
            return res.status(400).json({ message:'O dob é obrigatório'})
        if (!bi)
            return res.status(400).json({ message:'O bi é obrigatório'})
        if (!licenciado)
            return res.status(400).json({ message:'O lincenciado é obrigatório'})

        const disciplina = await disciplinaRepository.findOneBy({ id: Number(disciplina_id)})

        if (!disciplina)
            return res.status(404).json({ message:'A disciplina não existe'})
        
        try {

            const newProfessor= professorRepository.create({nome, morada, dob, bi, licenciado, disciplinas: [disciplina]})
            await professorRepository.save(newProfessor)
            return res.status(201).json(newProfessor)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message:'Internal Server Error'})
        }
    }
}