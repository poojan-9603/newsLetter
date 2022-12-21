const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});



mailchimp.setConfig({
  //*****************************ENTER YOUR API KEY HERE******************************
  apiKey: "b4f605d395d654496155d8b2f6ad7205-us13",
  //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
  server: "us13"
});


app.post("/", function(req, response) {
// const customer = JSON.parse();
const firstName = req.body.firstname;
const lastName = req.body.lastname;
const emailll = req.body.email;

const listId = "6709310fbe";
//Creating an object with the users data
const subscribingUser = {
  firstName: firstName,
  lastName: lastName,
  email: email
};

async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  });

  //If all goes well logging the contact's id
  res.sendFile(__dirname + "/success.html")
  console.log(
    `Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
  );
}
run().catch(e => res.sendFile(__dirname + "/failure.html"));
});


})


app.listen(3000, function() {
  console.log("Server is running on port 3000");
});








// api 1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3
// b4f605d395d654496155d8b2f6ad7205-us13
