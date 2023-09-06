const express = require('express');
const path = require('path');
const port = 8000; 
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
//middleware 1 
// app.use(function (req, res, next) {
//     //console.log('middleware 1 called ')
//     req.myName = 'saurav 2';
//     next()
//   }
// )

//middleware 2 
// app.use(function (req, res, next) {
//     console.log("my name from  mw2 ",req.myName);
//     //console.log('middleware 2 called ')
//     next()
//   }
//)

var contactList = [
    {
        name:"saurav",
        phone :"565654864"
    },
    {
        name:'manisha',
        phone : '123456789'
    },
    {
        name:'mamta',
        phone : '111111111'
    }
]


app.get('/',function(req,res){
    //console.log(__dirname);
    //res.end('<h1>Cool it is working</h1>');
    //console.log(req);
   // console.log('from the get route controller ',req.myName);
    
   Contact.find({
    //name:'bodan'
    }).then(function(contacts){
    return res.render('home',{
        title:"Contact List",
        contact_list:contacts
    })
}).catch((err)=>console.log("error while fetching from database",err))
   
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:'Play with ejs'
    }); 
})

//string params

// app.get('/delete-contact/:phone',function(req,res){
//      console.log(req.params);
//      let phone = req.params.phone; 
// });

//query params
//for deleting a contatct  
app.get('/delete-contact/',function(req,res){
    //normal delete
    //get the query from the url  
    
    //console.log(req.query);
     
    // let phone = req.query.phone; 
     

    //  let contactIndex = contactList.findIndex(contact=>contact.phone==phone);

    //  if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    //  }

    //  return res.redirect('/');//  return res.redirect('back');


    //latest delete 
    //deleting the contact in DB
    //get the id from query in the url 
    let id = req.query.id;

    //find the contact in the database using id and delete it 
    Contact.findByIdAndDelete(
    id).then(function(){
       return res.redirect('back');
    }).catch((err)=>console.log("error while deleting an object in database",err));

    

});


app.post('/create-contact',function(req,res){
    //console.log(req);
    //return res.redirect('/practice'); 
    //console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    //contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }).then(function(newContact){
        console.log("********",newContact);
        return res.redirect('back');
    }).catch((err)=>console.log(err))
    
})

app.listen(port,(err)=>{
    if(err){
        console.log('ERROR while runninbg the server :', err);
    }

    console.log('Here My express server is running on port', port);
        
})

