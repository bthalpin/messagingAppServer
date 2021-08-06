const postFriend = (data,db,io)=>{
    const {name, email, message,time} = data;
    if (!name || !email || !message){
        // return json.send('Incorrect form of submission');
    }
    
        db('friendmessage').insert({
            name:name,
            email:email,
            message:message,
            time:time
        })
            .then(data=>{
                db('friendmessage').select('*')
                .orderBy('id')
                .then(message=>io.emit('friendmessage',message))
                .catch(err=>'NOPE')
        })
    
    
    
    
    .catch(err => res.status(400).json('Unable to post'))
    }


module.exports = {
    postFriend
}