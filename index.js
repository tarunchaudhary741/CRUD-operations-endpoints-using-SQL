const exp = require("constants");
const express = require("express");
const app=express();
let port=3000;
app.set("view engine","ejs");
const path=require("path");
//app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})
const { v4: uuidv4 } = require('uuid');
let posts=[
    {
        id:uuidv4(),
        user:"@ravi",
        content:"ye kya ho gya"
    },
    {
        id:uuidv4(),
        user:"@shubah,",
        content:"sab mera hi h"
    },
    {
        id:uuidv4(),
        user:"@diwkar",
        content:"e marn de"
    },
    {
        id:uuidv4(),
        user:"@jitendra",
        content:"ek din surely"
    }
]
//let last_id="104";


// let post=posts.find((p) => {
//     if(p.id === id){
//         return p;
//     };
// });
// console.log(post);

app.get("/posts",(req,res)=>{
    console.log("Received");
    res.render("homepage.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    console.log("Received");
    res.render("newpost.ejs");
})

app.use(express.urlencoded({extended:true}));


app.post("/posts",(req,res)=>{
    console.log("Received");
    const{user,content}=req.body;
    //last_id=(parseInt(last_id)+1).toString();
    id=uuidv4();
    posts.push({id,user,content});

    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    const {id}=req.params;
    console.log(id);
    let post=posts.find((p) => {
        if(p.id === id){return p};
    });
    console.log(post);
    res.render("singlepost.ejs",{ post });
    
});

app.get("/posts/edit/:id",(req,res)=>{
    const {id}=req.params;
    console.log("DHD");
    let post=posts.find((p)=> p.id === id);
    res.render("editpost.ejs",{post});
})

let methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.patch("/posts/:id/",(req,res)=>{
    const {content}=req.body;
    const {id}=req.params;
    let post=posts.find((p)=> p.id === id);
    post.content=content;
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    const {id}=req.params;
    posts=posts.filter((p)=> p.id != id);
    res.redirect("/posts");
})