const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');


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

const db = knex({
    client:'pg',
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
const app = express();

app.use(express.json())

app.use(cors())

app.get('/',(req,res)=>{
    res.send('woo')
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
app.post('/friendrequest',(req,res)=>{friendrequest.addFriend(req,res,db)})
app.post('/unfriend',(req,res)=>unfriend.removeFriend(req,res,db))
app.post('/reject',(req,res)=>reject.rejectFriend(req,res,db))
app.post('/acceptfriend',(req,res)=>acceptfriend.addFriend(req,res,db))

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`);
})