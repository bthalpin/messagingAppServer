const sendMail = (req,res,db)=>{
    console.log(req.body,'hello')
    const {name, senderemail,recipientemail, message,time} = req.body;
    if (!name || !senderemail || !message || !recipientemail){
        return res.status(400).json('Incorrect form of submission');
    }
    
        // console.log(time)
        console.log('work',name,senderemail,recipientemail,message,time)
        db('privatemessage').insert({
            name:name,
            senderemail:senderemail,
            recipientemail:recipientemail,
            message:message,
            time:time
            
        })
        .then(data=>{
            console.log('hello',data)
            db('privatemessage').select('*')
            .then(message=>res.json(message))
            .catch(err=>'NOPE')
    })
    .catch(err => res.status(400).json('Unable to post'))
        
    
}

module.exports = {
    sendMail
}