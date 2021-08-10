const loadReadStatus = (data,db,io)=>{
    // console.log('here')
    const { recipientemail } = data;
    

    db('totalmessages')
            .where('recipientemail',recipientemail)
            .select('*')
            .orderBy('senderemail')
            .then(data=>{
                // console.log(data,'updateread')
                io.emit('updateReadStatus',data)
            })

                .catch(err=>'NOPE')
            }


module.exports = {
    loadReadStatus
}