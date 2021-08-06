const postPublic = (data,db,io)=>{
    const {name, email, message,time} = data;
    if (!name || !email || !message){
        // return res.status(400).json('Incorrect form of submission');
    }
    
        if(time){console.log(time)}
        db('publicmessages').insert({
            name:name,
            email:email,
            message:message,
            time:time
            
        })
        .then(data=>{
            // console.log('hello',data)
            db('publicmessages').select('*')
            .orderBy('id')
            .then(message=>io.emit('publicmessage',message))
            .catch(err=>'NOPE')
    })
    .catch(err => res.status(400).json('Unable to post'))
        }
    
    
    
    
    // .catch(err => res.status(400).json('Unable to post'))
    



module.exports = {
    postPublic
}