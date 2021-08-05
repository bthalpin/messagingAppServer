const load = (req,res,db)=>{
    const {email,friends} = req.body

    db('friendmessage').select('*')
    .orderBy('id')
    .then(data=>{
        // console.log(data)
        res.json(data)})
        
        .catch(err=>console.log(err))
}

module.exports = {
    load
}

// knex.from('pin_table').whereRaw('? = ANY(likes_received)', id);