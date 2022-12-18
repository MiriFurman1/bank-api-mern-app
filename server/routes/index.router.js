import { Router } from "express";
import { getAccounts ,addAccount,getAccountById,depositMoney,deleteAccount,withdrawMoney } from "../controllers/controllers.js";

const indexRouter=Router()


indexRouter.get('/accounts',getAccounts )
indexRouter.get('/accounts/:id',getAccountById  )
indexRouter.post('/accounts/add',addAccount)
indexRouter.put('/accounts/:id/withdraw',withdrawMoney)
indexRouter.put('/accounts/:id/deposit',depositMoney)

indexRouter.delete('/accounts/:id/delete', deleteAccount)
export {indexRouter}