const removeLike = (req,res,db) =>{
    const {name,email,id,database} = req.body
    if (!name || !email || !id || !database){
        return res.status(400).json('Error Liking')
    }
    console.log('remove')
    database === 'publicmessages'?
    db('publicmessages')
        .where('id',id)
        .update({
            likes:db.raw('array_remove(likes,?)',[JSON.stringify({'name':name,'email':email.toUpperCase()})])
        })
    
        .then(data=>{
            console.log('hello',data)
            db('publicmessages')
            .select('*')
            .orderBy('id')
            
            .then(message=>res.json(message))
            .catch(err=>'NOPE')
    })




        .catch(err => res.status(400).json('Unable to post'))
        :
        db('friendmessage')
        .where('id',id)
        .update({
            likes:db.raw('array_remove(likes,?)',[JSON.stringify({'name':name,'email':email.toUpperCase()})])
        })
    
        .then(data=>{
            console.log('hello',data)
            db('friendmessage')
            .select('*')
            .orderBy('id')
            
            .then(message=>res.json(message))
            .catch(err=>'NOPE')
    })




        .catch(err => res.status(400).json('Unable to post'))

}

module.exports = {
    removeLike
}


