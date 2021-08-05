const addLikes = (data,db,io) => {
    const {name, email, id ,database } = data
// console.log(name, email, id ,database)
    if (!name || !email || !id || !database){
        // return res.status(400).json('Error Liking')
    }

    database === 'publicmessages'?
    db('publicmessages')
        .where('id',id)
        .update({
            likes:db.raw('array_append(likes,?)',[{'name':name,'email':email.toUpperCase()}])
        })
    
        .then(data=>{
            // console.log('hello',data)
            db('publicmessages')
            .select('*')
            .orderBy('id')
            
            .then(message=>io.emit('publiclikes',message))
            .catch(err=>'NOPE')
    })




        .catch(err => res.status(400).json('Unable to post'))
        :
        db('friendmessage')
        .where('id',id)
        .update({
            likes:db.raw('array_append(likes,?)',[{'name':name,'email':email.toUpperCase()}])
        })
    
        .then(data=>{
            // console.log('hello',data)
            db('friendmessage')
            .select('*')
            .orderBy('id')
            
            .then(message=>io.emit('friendlikes',message))
            .catch(err=>'NOPE')
    })




        .catch(err => res.status(400).json('Unable to post'))

}

module.exports = {
    addLikes
}

