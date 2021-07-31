const load = (req,res,db)=>{
    db('publicmessages').select('*')
    .orderBy('id')
    .then(data=>
        res.json(data))
        .catch(err=>console.log(err))
}

module.exports = {
    load
}