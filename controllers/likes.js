const addLikes = (req,res,db) => {
    const { email, id ,database } = req.body

    if (!email || !id || !database){
        return res.status(400).json('Error Liking')
    }

    database === 'publicmessages'?
    db('publicmessages')
        .where('id',id)
        .update({
            likes:db.raw('array_append(likes,?)',[email.toUpperCase()])
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
            likes:db.raw('array_append(likes,?)',[email.toUpperCase()])
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
    addLikes
}

