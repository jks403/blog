//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];
const contacts = [];
const abouts = [];
let hobbies = [];
const shortContent = posts.slice(0,15);
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
  

app.get("/", function(req, res) {
    res.render("home",   {
    StartingContent:homeStartingContent, 
      posts:posts,    
   
  });
  
});




app.get("/about", function(req, res) {
  res.render("about", {
    about:aboutContent, 
    abouts:abouts
  });
  console.log(abouts);
});


app.get("/compcontact", function(req, res) {
  res.render("compcontact");
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent:contactContent,
    contacts: contacts
    
  });
  console.log(contacts);
});

app.get("/hobbies", function(req, res) {
  res.render("hobbies", {
     
       hobbies: hobbies
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get("/comphobbies", function(req, res) {
  res.render("comphobbies");
});

app.get("/compabout", function(req, res) {
  res.render("compabout");
});

 app.post("/compose", function(req, res) {
    const post = {
      title: req.body.postTitle, 
      content: req.body.postBody
      
    };
   posts.push(post);

    res.redirect("/");      /* sending to app.get("/"); */
 });


app.post("/compcontact", function(req, res) {
  const contact = {
    fname : req.body.first, 
    lname : req.body.last, 
    email : req.body.email
  };
  contacts.push(contact);

  res.redirect("/contact"); /* sending to app.get("/contact") */
  
});


app.post("/comphobbies", function(req, res) {
  const hobbie = {
    firstName : req.body.first, 
    lastName  : req.body.last, 
    hobbies   : req.body.about
  };
  hobbies.push(hobbie);

  res.redirect("/hobbies");
  console.log(hobbie);
});



   /* userInput variable stores userText from the .ejs file form --> check the form name on compose.ejs*/

app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);
    
    if(storedTitle === requestedTitle){
      res.render("post", {
        title: post.title,
        content: post.content,       
        
      });
      
    }
      
    });
  });


app.get("/hobbies/:hobbieName", function(req, res) {
  const requestedName = _.lowerCase(req.params.hobbieName);

  hobbies.forEach(function(hobbie) {
    const storedName = _.lowerCase(hobbie.firstName); // from the app.post(comphobbies)
    if(storedName === requestedName) {
      res.render("hobbie", {
        firstName : hobbie.firstName, 
        hobbie    : hobbie.lastName,
      });
    }
  });
});
  
  
    
  

 


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

