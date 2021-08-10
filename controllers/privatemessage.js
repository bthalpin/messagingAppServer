const sendMail = (data,db,io)=>{
    // console.log(req.body,'hello')
    const {name, senderemail,recipientemail, message,time} = data;
    // console.log(data,name,senderemail,recipientemail,message,time)
    if (!name || !senderemail || !message || !recipientemail){
        // return res.status(400).json('Incorrect form of submission');
    }
    
        // console.log(time)
        // console.log('work',name,senderemail,recipientemail,message,time)
        db('privatemessage').insert({
            name:name,
            senderemail:senderemail,
            recipientemail:recipientemail,
            message:message,
            time:time
            
        })
        .then(data=>{
            // console.log('hello',data)
            db('privatemessage')
            .where('senderemail',senderemail)
            .orWhere('recipientemail',senderemail.toUpperCase())
            .select('*')
            .orderBy('id')
            .then(message=>{
                // console.log('sending')
                io.emit('privatemessage',{message:message,recipientemail:recipientemail,senderemail:senderemail})})
                .catch(err=>'NOPE')
    })
    .catch(err => res.status(400).json('Unable to post'))
    db('totalmessages')
    .where('senderemail',senderemail)
    .andWhere('recipientemail',recipientemail)
    .update({'total':db.raw(['total+1'])})
    .then(data)
    .then(
        db('totalmessages')
        .where('recipientemail',recipientemail)
                .select('*')
                .then(data)
                    // console.log('new',data)}
                    // io.emit('updateReadStatus',data)}
                    
    )
    
}

module.exports = {
    sendMail
}