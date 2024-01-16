import { Router } from "express";
import { AlunoController } from "./controllers/AlunoController";
import { DisciplinaController } from "./controllers/DisciplinaController";
import { ProfessorController } from "./controllers/ProfessorController";

const routes =  Router()

//alunos

routes.get("/alunos", new AlunoController().index)
routes.get("/alunos/:id", new AlunoController().show)
routes.delete("/alunos/:id", new AlunoController().destroy)
routes.put("/alunos/:id", new AlunoController().update)
routes.post("/alunos/:disciplina_id/disciplinas", new AlunoController().create)

//disciplinas

routes.get("/disciplinas", new DisciplinaController().index)
routes.get("/disciplinas/:id", new DisciplinaController().show)
routes.post("/disciplinas", new DisciplinaController().create)
routes.put("/disciplinas/:id", new DisciplinaController().update)
routes.delete("/disciplinas/:id", new DisciplinaController().destroy)

//professores

routes.get("/professores", new ProfessorController().index)
routes.get("/professores/:id", new ProfessorController().show)
routes.post("/professores/:disciplina_id/disciplinas", new ProfessorController().create)
routes.put("/professores/:id", new ProfessorController().update)
routes.delete("/professores/:id", new ProfessorController().destroy)


export default routes