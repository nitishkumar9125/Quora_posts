const express = require("express");
const app = express();
const { dir } = require("console");
const port = 3000;

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


const { v4: uuidv4 } = require('uuid');
const path = require("path");
// const { constants } = require("buffer");
app.use(express.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views") );
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "nitish",
        contant: "this is my first post",
    },
    {
        id: uuidv4(),
        username: "saba",
        contant: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum accusamus necessitatibus maxime porro cum nulla debitis deserunt maiores consequatur pariatur nemo blanditiis magnam laborum repellat, culpa doloremque, tempore voluptas delectus?",
    },
    {
        id: uuidv4(),
        username: "saurabh",
        contant: "this is about restfulAPI",
    }
]

app.get("/posts", (req , res)=>{
    console.log("i am listening");
    res.render("index.ejs", {posts});
})
app.get("/post/new", (req, res)=>{
    res.render("new.ejs");
})
app.post("/posts", (req, res)=>{
    let{username , contant} = req.body;
    let id = uuidv4();
    posts.push({id , username  , contant});
    res.redirect("/posts")
})
app.patch("/posts/:id", (req, res)=>{
    let { id } = req.params;
    let newcontent = req.body.contant;
    let post = posts.find((p)=>(id === p.id));
    post.contant =  newcontent;
    console.log(post);
    res.redirect("/posts")
})
app.delete("/posts/:id/Delete", (req, res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>(id != p.id));
    res.redirect("/posts");
})
app.get("/posts/:id/edit", (req, res)=>{
    let { id } = req.params;
    let post = posts.find((p)=>(id === p.id));
    res.render("edit.ejs", {post});
})
app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>(id === p.id));
    res.render("show.ejs", {post});
})
app.listen(port, ()=>{
    console.log('Listening');
})