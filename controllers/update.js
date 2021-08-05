// const updateUser = (data,db,io)=>{
//     console.log(req)
//     const { email } = data;
//     console.log(email,'email')
//     if ( !email ){
//         // return res.status(400).json('Incorrect form of submission');
//     }

//     db('users')
//             // .where('email',email)
            
//                 .select('*')
//                 .then(user=>io.emit('update',user))
//                 .catch(err=>'NOPE')
            
// }


// module.exports = {
//     updateUser
// }