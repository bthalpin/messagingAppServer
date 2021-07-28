const handleRegister = (req,res,db,bcrypt)=>{
    const {name, email, password,friends} = req.body;
    console.log(name,email,password)
    if (!name || !email || !password || !friends){
        return res.status(400).json('Incorrect form of submission');
    }
    const hash = bcrypt.hash(password,10).then(function(hash){
        console.log(hash,name,email)
    db.transaction(trx =>{
    
        trx.insert({
            hash:hash,
            email:email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email:loginEmail[0],
                name:name,
                friends:friends
                
            })
            .then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    })
    
    .catch(err => res.status(400).json('Unable to register'))
    }



module.exports = {
    handleRegister
}