const express = require('express')

require("./db/conn");
const users = require("./models/users");
const posts = require("./models/posts");

const app = express();
const port = process.env.PORT || 7789;

app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:7789');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//create a new students
app.post('/create-user',(req,res) => {
    console.log(req.body);
    const user = new users(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    })

   // res.send("Created studnet success!");
})

//update
app.post('/update-students/:id', async(req,res) => {
    const _id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    console.log(req.body.name);
    students.findByIdAndUpdate({_id},{"name": name,"email": email,"phone": phone,"address": address}, function(err, result){

        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }

    })
})

//get user list data
app.get("/user-list", async (req,res) => {
    try{
        const userData = await users.find();
        console.log(userData);

        if(!userData){
            return res.status(404).send();
        }else{
            res.send(userData);
        }
    }catch(e){
        res.send(e)
    }
})

//get data by id
app.get("/students/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const studentData = await students.findById(_id);
        console.log(studentData);

        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    }catch(e){
        res.send(e)
    }
    res.send("Get student data");
})


// post create
app.post('/create-post',(req,res) => {
    console.log(req.body);
    const post = new posts(req.body);
    post.save().then(() => {
        res.status(201).send(post);
    })
})
//get post list data
app.get("/post-list", async (req,res) => {
    try{
        const postData = await posts.find();
        console.log(postData);

        if(!postData){
            return res.status(404).send();
        }else{
            res.send(postData);
        }
    }catch(e){
        res.send(e)
    }
})

//get post by id
app.get("/view-post/:id", async (req,res) => {
    try{
        const _id = req.params.id;
        const postData = await posts.findById(_id);
        console.log(postData);

        if(!postData){
            return res.status(404).send();
        }else{
            res.send(postData);
        }
    }catch(e){
        res.send(e)
    }
    res.send("Get post data");
})
//update post
app.put('/update-post/:id', async(req,res) => {
    const _id = req.params.id;
    const title = req.body.title;
    const body = req.body.body;

    console.log(req.body.title);
    posts.findByIdAndUpdate({_id},{"title": title,"body": body}, function(err, result){

        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }

    })
})

app.listen(port,() => {
    console.log(`connection is setup at ${port}`);
})