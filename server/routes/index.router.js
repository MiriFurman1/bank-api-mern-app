import { Router } from "express";
import { getPlants,addPlants } from "../controllers/controllers.js";

const indexRouter=Router()


indexRouter.get('/plants',getPlants)
indexRouter.post('/plants/add',addPlants)
export {indexRouter}