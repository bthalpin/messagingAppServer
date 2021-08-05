const removeFriend = (req,res,db,io)=>{
    const { email, friend} = req.body;
    if ( !email || !friend){
        return res.status(400).json('Incorrect form of submission');
    }
    // console.log('unfriend',email,friend)
        // console.log(name,email,message,time)
        db('users')
            .where('email',email)
            .update({
                friends:db.raw('array_remove(friends,?)',[friend])
            })
        
            .then(data=>{
                res.json(data)})
                db('users')
            .where('email',friend)
            .update({
                friends:db.raw('array_remove(friends,?)',[email])
            })
            .then(data=>{
                // console.log('remove2')
                db('users')
                .where('email',email)
                .select('*')
                
                .then(message=>io.emit('unfriend',message))
                .catch(err=>'NOPE')
        })
        .then(data=>{
            // console.log('deleted')
            db('users')
            .where('email',friend)
            .select('*')
            
            .then(message=>io.emit('unfriend',message))
            .catch(err=>'NOPE')
            
    })



.catch(err => res.status(400).json('Unable to post'))
    
    
    // .catch(err => res.status(400).json('Unable to post'))

    // db('users')
    //         .where('email',friend)
    //         .update({
    //             friends:db.raw('array_remove(friends,?)',[email])
    //         })
        
    //         .then(data=>{
    //             console.log('deleted')
    //             db('users')
    //             .where('email',friend)
    //             .select('*')
                
    //             .then(message=>io.emit('unfriend',message))
    //             .catch(err=>'NOPE')
                
    //     })
    
    
    
    // .catch(err => res.status(400).json('Unable to post'))


    }


module.exports = {
    removeFriend
}