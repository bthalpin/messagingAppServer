const rejectFriend = (req,res,db)=>{
    const { email, friend,option} = req.body;
    if ( !email || !friend){
        return res.status(400).json('Incorrect form of submission');
    }

    // db('users')
    // .where('email',email)
    // .update({
    //     requests:db.raw('array_remove(requests,?)',[friend])
    // })

    // .then(data=>{
    //     console.log('deletedrequest',email,friend,data)})
    //     .catch(err => res.status(400).json('Unable to post'))


    // db('users')
    //     .where('email',friend)
    //     .update({
    //         pendingrequests:db.raw('array_remove(pendingrequests,?)',[email])
    //     })
    
    //     .then(data=>{
    //         console.log('deleted pending')})
    //         .catch(err => res.status(400).json('Unable to post'))

    db('users')
    .where('email',email)
    .update({
        requests:db.raw('array_remove(requests,?)',[friend])
    })

    .then(data=>{
        console.log('hello',data)
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
        console.log('deleted')
        
})



.catch(err => res.status(400).json('Unable to post'))
    if (option === 'request'){
        db('users')
        .where('email',email)
        .select('*')
        
        .then(message=>res.json(message))
        .catch(err=>'NOPE')
    }else{
        db('users')
        .where('email',friend)
        .select('*')
        
        .then(message=>res.json(message))
        .catch(err=>'NOPE')
    }
            
    













    
    }


module.exports = {
    rejectFriend
}