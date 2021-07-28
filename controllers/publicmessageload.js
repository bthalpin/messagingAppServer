const load = (req,res,db)=>{
    db('publicmessages').select('*')
    .then(data=>
        res.json(data))
        .catch(err=>console.log(err))
}

module.exports = {
    load
}