import { Schema, model } from "mongoose";

const bankAccountSchema = new Schema({
    name: { type: String,  required: true },
    userId:{type: Number, unique: true, required: true},
    cash: {type: Number, default:0},
    credit: {type: Number, default:0}
})

const Account = model('accounts', bankAccountSchema)
export { Account}