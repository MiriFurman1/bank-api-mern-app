import { Router } from "express";
import { getPlants } from "../controllers/controllers.js";

const indexRouter=Router()


indexRouter.get('/getallplants',getPlants)

export {indexRouter}