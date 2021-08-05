const load = (req,res,db)=>{
    
    const {email,friends}=req.body

    db('privatemessage')
    .where('senderemail',email)
    .orWhere('recipientemail',email.toUpperCase())
    .select('*')
    .orderBy('id')
    .then(data=>
        res.json(data))
        .catch(err=>console.log(err))
}

module.exports = {
    load
}