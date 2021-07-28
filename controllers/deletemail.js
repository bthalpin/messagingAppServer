const deletePost = (req,res,db) =>{
    const {id,database} = req.body
    if (!id || !database){
        return res.status(400).json('Error Deleting')
    }

    
    db('privatemessage')
    .del()
        .where('id',id)
        
    
    
        .then(data=>{
            console.log('hello',data)
            db('privatemessage')
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


