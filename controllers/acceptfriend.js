const addFriend = (req,res,db,io)=>{
    const { email, friend} = req.body;
    if ( !email || !friend){
        return res.status(400).json('Incorrect form of submission');
    }
    

    db('users')
    .where('email',email)
    .update({
        requests:db.raw('array_remove(requests,?)',[friend])
    })

    .then(data=>{
        res.json(data)
        // db('users')
        // .where('email',email)
        // .select('requests')
        
        // .then(message=>res.json(message))
        // .catch(err=>'NOPE')
})



.catch(err => res.status(400).json('Unable to post'))

db('users')
    .where('email',friend)
    .update({
        pendingrequests:db.raw('array_remove(pendingrequests,?)',[email])
    })

    .then(data=>{
        // console.log('deleted')
        
})



.catch(err => res.status(400).json('Unable to post'))
        // console.log(name,email,message,time)
        db('users')
            .where('email',email)
            .update({
                friends:db.raw('array_append(friends,?)',[friend])
            })
        
            .then(data=>{
                // console.log('hello',data)
                db('users')
                .where('email',email)
                .select('*')
                
                .then(user=>io.emit('acceptfriend',user))
                .catch(err=>'NOPE')
        })
    
    
    
    
    .catch(err => res.status(400).json('Unable to post'))
    


    db('users')
            .where('email',friend)
            .update({
                friends:db.raw('array_append(friends,?)',[email])
            })
        
            .then(data=>{
                // console.log('added')
                db('users')
                .where('email',friend)
                .select('*')
                
                .then(user=>io.emit('acceptfriend',user))
                .catch(err=>'NOPE')
        })
    
    
    
    
    .catch(err => res.status(400).json('Unable to post'))
    }

module.exports = {
    addFriend
}