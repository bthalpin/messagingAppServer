const deletePost = (req,res,db) =>{
    const {id,database} = req.body
    if (!id || !database){
        return res.status(400).json('Error Deleting')
    }

    database === 'publicmessages'?
    db('publicmessages')
    .del()
        .where('id',id)
        
    
    
        .then(data=>{
            console.log('hello',data)
            db('publicmessages')
            .select('*')
            .orderBy('id')
            
            .then(message=>res.json(message))
            .catch(err=>'NOPE')
    })




        .catch(err => res.status(400).json('Unable to delete'))
        :
        db('friendmessage')
        .del()
        .where('id',id)
        
        .then(data=>{
            console.log('hello',data)
            db('friendmessage')
            .select('*')
            .orderBy('id')
            
            .then(message=>res.json(message))
            .catch(err=>'NOPE')
    })




        .catch(err => res.status(400).json('Unable to delete'))

}

module.exports = {
    deletePost
}


