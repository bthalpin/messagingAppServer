const removeFriend = (req,res,db)=>{
    const { email, friend} = req.body;
    if ( !email || !friend){
        return res.status(400).json('Incorrect form of submission');
    }
    
        // console.log(name,email,message,time)
        db('users')
            .where('email',email)
            .update({
                friends:db.raw('array_remove(friends,?)',[friend])
            })
        
            .then(data=>{
                // console.log('hello',data)
                db('users')
                .where('email',email)
                .select('*')
                
                .then(message=>res.json(message))
                .catch(err=>'NOPE')
        })
    
    
    
    .catch(err => res.status(400).json('Unable to post'))

    db('users')
            .where('email',friend)
            .update({
                friends:db.raw('array_remove(friends,?)',[email])
            })
        
            .then(data=>{
                console.log('deleted')
                
        })
    
    
    
    .catch(err => res.status(400).json('Unable to post'))


    }


module.exports = {
    removeFriend
}