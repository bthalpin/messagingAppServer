const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// const { Server } = require('socket.io');
// const io = new Server(server);
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const io = require('socket.io')(server,{
    cors:{
        origin:'https://bthalpin.github.io',
        methods:["GET","POST"]
    },
});


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const friendmessage = require('./controllers/friendmessage');
const privatemessage = require('./controllers/privatemessage');
const publicmessage = require('./controllers/publicmessage');
const friendmessageload = require('./controllers/friendmessageload');
const privatemessageload = require('./controllers/privatemessageload');
const publicmessageload = require('./controllers/publicmessageload');
const friends = require('./controllers/friends');
const likes = require('./controllers/likes');
const dislike = require('./controllers/dislike');
const deletemessage = require('./controllers/deletemessage');
const deletemail = require('./controllers/deletemail');
const friendrequest = require('./controllers/friendrequest');
const unfriend = require('./controllers/unfriend');
const reject = require('./controllers/reject');
const acceptfriend = require('./controllers/acceptfriend');
const updateRead = require('./controllers/updateRead');
const read = require('./controllers/read');

const db = knex({
    client:'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
        timezone:'UTC'
   }
});

// const db = knex({
//     client:'pg',
//     connection: {
//             host: '127.0.0.1',
//             user: 'postgres',
//             password: 'testing',
//             database: 'social'
        
//     }
// })

app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>{
    res.send('woo')
})

// io.use((socket,next)=>{
//     const username = socket.handshake.auth.username;
//     if (!username) {
//         return next(new Error('invalid username'))
//     }
//     socket.username = username;
//     next();
// })

io.on('connection',(socket)=>{
    
    console.log('a user connected')
    
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
    socket.on('privatemessage',(data)=>{
        privatemessage.sendMail(data,db,io)
        // console.log('recieved')
    })
    socket.on('publicmessage',(data)=>{
        publicmessage.postPublic(data,db,io)
    })
    socket.on('friendmessage',(data)=>{
        friendmessage.postFriend(data,db,io)
    })
    socket.on('likes',data=>{
        likes.addLikes(data,db,io)
    })
    socket.on('friends',data=>{
        friends.addFriends(data,db,io)
    })
    socket.on('dislike',data=>{
        dislike.removeLike(data,db,io)
    })
    socket.on('deletemessage',data=>{
        deletemessage.deletePost(data,db,io)
    })
    socket.on('deletemail',data=>{
        deletemail.deletePost(data,db,io)
    })
    socket.on('friendrequest',data=>{
        friendrequest.addFriend(data,db,io)
    })
    socket.on('unfriend',data=>{
        unfriend.removeFriend(data,db,io)
    })
    socket.on('reject',data=>{
        reject.rejectFriend(data,db,io)
    })
    socket.on('acceptfriend',data=>{
        acceptfriend.addFriend(data,db,io)
    })
    socket.on('read',data=>{
        read.markRead(data,db,io)
    })
    socket.on('loadRead',data=>{
        updateRead.loadReadStatus(data,db,io)
    })

    // const users = [];
    // for (let [id, socket] of io.of('/').sockets){
    //     user.push({
    //         userID:id,
    //         username:socket.username,
    //     });
    // }
    // socket.emit('users',users);
})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.post('/signin',(req,res)=>{signin.handleSignIn(req,res,db,bcrypt)})
app.post('/privatemessage',(req,res)=>{privatemessage.sendMail(req,res,db)})
app.post('/publicmessage',(req,res)=>{publicmessage.postPublic(req,res,db)})
app.post('/friendmessage',(req,res)=>{friendmessage.postFriend(req,res,db)})
app.post('/friendmessageload',(req,res)=>friendmessageload.load(req,res,db))
app.post('/privatemessageload',(req,res)=>privatemessageload.load(req,res,db))
app.post('/publicmessageload',(req,res)=>publicmessageload.load(req,res,db))
app.post('/likes',(req,res)=>likes.addLikes(req,res,db))
app.post('/friends',(req,res)=>friends.addFriends(req,res,db))
app.post('/dislike',(req,res)=>dislike.removeLike(req,res,db))
app.post('/deletemessage',(req,res)=>{deletemessage.deletePost(req,res,db)})
app.post('/deletemail',(req,res)=>{deletemail.deletePost(req,res,db)})
app.post('/friendrequest',(req,res)=>{friendrequest.addFriend(req,res,db,io)})
app.post('/unfriend',(req,res)=>unfriend.removeFriend(req,res,db,io))
app.post('/reject',(req,res)=>reject.rejectFriend(req,res,db,io))
app.post('/acceptfriend',(req,res)=>acceptfriend.addFriend(req,res,db,io))
// app.post('/update',(req,res)=>update.updateUser(req,res,db))

const PORT = process.env.PORT;
server.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`);
})