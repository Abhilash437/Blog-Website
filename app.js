//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require('mongoose');
//const sendEmail = require(__dirname+'/mail.js');
const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: 'f67ff866834c0e36222f3c0887cd4c5b-1b3a03f6-a144af1f',
    domain: 'sandbox10798bd8f80d4fb38cd44184dd57f5f3.mailgun.org'
  }
};

const transporter = nodemailer.createTransport(mailgun(auth));

const homeStartingContent = "Welcome to my blog where I post technology and art related blogs eveyrday. It is a place where you can find me talking about tech, art related articles (often by the pros), hardware reviews as well interesting tidbits of information including tips on how others are creating new technologies etc.";
const aboutContent = "I am a full stack web developerr and a digital artist who aspiers to provide services in web developer field and UI/UX field. I am studying Computer Science and Engineering from JSS Science and Technology University, Mysuru. I am a freelancer, my goal is to create fun product online through various tools for internet users only. The main project will be designing websites with HTML5 Canvas technology using Javascript on top. My primary focus would include redesigning website designs into the ideal user experience while adding useful features such login integration which most people do not need but does bring advantages like easier management access allowing them perform more complicated tasks easily than ever before.";


const app = express();
let posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect('mongodb+srv://Abhilash:Abhilash11@atlascluster.fshfq.mongodb.net/blogsDB');

const postSchema = new mongoose.Schema({
  Title: String,
  Text: String
});

const Post = mongoose.model("Post",postSchema);


app.get("/", (req, res) => {
  Post.find({},(err,foundPosts)=>{
    if(!err){

      res.render("home",{homecontent:homeStartingContent,blogs:foundPosts});
      //res.redirect("/");
    }else{
      console.log(err);
    }
  });
  //console.log(Post);

  // res.render("home", {
  //   homecontent: homeStartingContent,
  //   blogs: posts
  // });
})

app.get("/about", (req, res) => {
  res.render("about", {
    aboutcont: aboutContent
  });
})

app.get("/contact", (req, res) => {
  res.render("contact");
})

app.get("/compose",(req,res)=>{
  res.render("compose");
})

app.post("/compose",(req,res)=>{
  // let post = {
  //   Title: req.body.blogTitle,
  //   Text: req.body.blogContent
  // }
  // posts.push(post);
  const Title = req.body.blogTitle;
  Post.findOne({Title: Title},(err,foundPost)=>{
    if(!err){
      if(foundPost){
        foundPost.Text += req.body.blogContent;
        foundPost.save();
      }else{
        const posts = new Post({
          Title: Title,
          Text: req.body.blogContent
        });
          posts.save();
      }
    }else{
      console.log(err);
    }
  });


  res.redirect('/');
  //console.log(posts);
})

app.get("/posts/:blogId",(req,res)=>{

  Post.findOne({_id:req.params.blogId},(err,post)=>{
    if(!err){
      res.render("post",{post:post})
    }else
    console.log(err);
  })
  // posts.forEach(function(post){
  //   let postTitle = post.Title;
  //   if(_.lowerCase(postTitle) === _.lowerCase(key))
  //     {
  //       res.render("post",{post:post});
  //     }
  // })

});

app.post("/contact",(req,res)=>{
  //console.log(req.body);
  const mailOptions = {
    from: req.body.email,
    to: 'abhilashhathwar20@gmail.com',
    subject: req.body.subject,
    text: req.body.message
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions,(err,data)=>{
    if(err){
      console.log(err);
    }else{
      console.log("Successfully sent mail");
    }
  })
  res.redirect('/')
})

app.listen(process.env.PORT || 6000, function() {
  console.log("Server started on port 3000");
});
