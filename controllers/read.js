const markRead = (data,db,io)=>{
    // console.log(req)
    const { senderemail,recipientemail } = data;
    

    db('totalmessages')
        .where('senderemail',senderemail)
            .andWhere('recipientemail',recipientemail)
            .update({read:db.raw('??',['total'])})
            .then(data=>{
                db('totalmessages')
                // .where('senderemail',senderemail)
                .where('recipientemail',recipientemail)
                .select('*')
                .orderBy('senderemail')
                .then(data=>{
                    // console.log('readbeforeupdate',data )
                    io.emit('update',data)
                })
            }
                
            ).catch(err=>'NOPE')
            
}


module.exports = {
    markRead
}