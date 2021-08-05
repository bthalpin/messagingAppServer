const addFriends = (data,db,io)=>{
    const { email, newFriend} = data;
    if ( !email || !newFriend){
        return res.status(400).json('Incorrect form of submission');
    }
    
        // console.log(name,email,message,time)
        db('users')
            .where('email',email)
            .update({
                friends:db.raw('array_append(friends,?)',[newFriend])
            })
        
            .then(data=>{
                // console.log('hello',data)
                db('users')
                .where('email',email)
                .select('friends')
                
                .then(message=>io.emit('friends',message))
                .catch(err=>'NOPE')
        })
    
    
    
    
    .catch(err => res.status(400).json('Unable to post'))
    }


module.exports = {
    addFriends
}