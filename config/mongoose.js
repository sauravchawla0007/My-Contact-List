//old method 

// //require the library
// const mongoose = require('mongoose');

// //connect to the database
// mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');

// //acquire the connection(to check if it's successful)
// const db = mongoose.connection;

// //error
// db.on('error', function(err) { console.log(err.message); });

// //up and running then print the message
// db.once('open', function() {
  
//     console.log("Successfully connected to the database");

// });

//latest method 

//require the library
const mongoose = require('mongoose');

//acquire the connection(to check if it's successful)
main()
.then(()=>console.log("successfully connected"))
.catch(err => console.log(err));

//connect to the database
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db');
   
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}