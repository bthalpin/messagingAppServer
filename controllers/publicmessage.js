const postPublic = (req,res,db)=>{
    const {name, email, message,time} = req.body;
    if (!name || !email || !message){
        return res.status(400).json('Incorrect form of submission');
    }
    
        console.log(time)
        db('publicmessages').insert({
            name:name,
            email:email,
            message:message,
            time:db.fn.now()
            
        })
        .then(data=>{
            console.log('hello',data)
            db('publicmessages').select('*')
            .orderBy('id')
            .then(message=>res.json(message))
            .catch(err=>'NOPE')
    })
    .catch(err => res.status(400).json('Unable to post'))
        }
    
    
    
    
    // .catch(err => res.status(400).json('Unable to post'))
    



module.exports = {
    postPublic
}