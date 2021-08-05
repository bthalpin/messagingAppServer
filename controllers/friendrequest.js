const addFriend = (req,res,db,io)=>{
    const { email, newFriend} = req.body;
    // console.log(req.body)
    if ( !email || !newFriend){
        return res.status(400).json('Incorrect form of submission');
    }

        db('users')
            .where('email',newFriend)
            .select('email')
            .then(data=>{
                db('users')
                    .where('email',newFriend)
                    .select('email')
                    .then(data=>{
                        if(data[0]!==undefined){
                            db('users')
                            .where('email',newFriend)
                            .update({
                                requests:db.raw('array_append(requests,?)',[email])
                            })
                            
                            .then(data=>{
                                res.json(data)
                                    
                                
                        db('users')
                                .where('email',email)
                                .update({
                                    pendingrequests:db.raw('array_append(pendingrequests,?)',[newFriend])
                                })
                            
                                .then(data=>{
                                    db('users')
                                    .where('email',email)
                                    .select('*')
                                    
                                    .then(users=>{
                                        // console.log(users)
                                        io.emit('friendrequest',users)})
                                    .catch(err=>'NOPE')
                                })
                                .then(data=>{
                                    db('users')
                                    .where('email',newFriend)
                                    .select('*')
                                    
                                    .then(users=>{
                                        // console.log(users)
                                        io.emit('friendrequest',users)})
                                    .catch(err=>'NOPE')
                                }

                                )
                            }).catch(err => res.status(400).json('Unable to post'))
                        }
            })
            })
        // console.log('request')
        
        
                    
        
    
    
    
    
    
    }


module.exports = {
    addFriend
}