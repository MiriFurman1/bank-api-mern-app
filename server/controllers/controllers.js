import {Plant} from '../models/plants.model.js'
export const getPlants = ((req, res) => {
    try {
        res.send('hola')
    }
    catch {
        res.send(err.message)
    }
})

export const addPlants = async(req, res) => {

    try {
        const { body } = req
        const newPlant = await Plant.create(body);
        res.status(201).send(newPlant)
    }
    catch(err) {
        res.send(err.message)
    }
}