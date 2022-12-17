export const getPlants=('/',(req,res)=>{
    try{
        res.send('hola')
    }
    catch{
        res.send(err.message)
    }
})