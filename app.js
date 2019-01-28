var https = require('https');
var express = require('express');
var util = require("util");
var http = require("http");

var app = express();
var body_parser = require('body-parser');
app.use(body_parser.urlencoded({ extended: false }));


 var badges = 155;
 	var username = "ryanpierson87";
  let body = "";
  var name = "";
var request = require("request");




app.get('/',function(req,res,next){
    
request("https://teamtreehouse.com/"+username+".json", function (error, response, body) {
  console.log( "getUSername: " + username);
  try{
            username = "";
            console.log("username" + username);
            res.render('index.ejs',{username:username});
    
    

  }catch(error){
      next();
      res.render('error.ejs');
  }
   
      
     
     
});
  

});

app.post('/',function(req,res){
  username = req.body.username;

  console.log(username);
  res.redirect('/profile');
});
app.get('/profile',function(req,res){
	try{
  	console.log("Username: "+ username);
https.get("https://teamtreehouse.com/"+username+".json",response=>{

       response.on("data",data=>{
            body+=data;
        });  
       if (response.statusCode !== 200) {
            console.log("Sorry Couldnt find profile");
            username = " " ;
            console.log(username);
            res.redirect("/");
        }
  else{
      response.on('end',()=>{
          name = JSON.parse(body);
        
          username = name.profile_name;
          badges = name.points.total;

          console.log(username + ' has a total of ' + badges);
         res.render('profile.ejs',{username: name});

  });

  }

          

   
       
});

}catch(error){
          console.log(error.message);
}
	

});








app.post('/',function(req,res){
	 username =  req.body.username;
try{
  	
https.get("https://teamtreehouse.com/"+username+".json",response=>{

       response.on("data",data=>{
            body+=data;
        });  
       
       response.on('end',()=>{
          name = JSON.parse(body);
        
          username = username;
          badges = name.points.total;

          console.log(username + ' has a total of ' + badges);
           username = " ";
          res.redirect("/profile");
  });
});

}catch(error){
          console.log(error.message);
}
    console.log( "after posting : " + username);
    


});
app.listen(8080,function(){
	console.log('OKIE');
})
