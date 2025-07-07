const express = require('express');     // ✅ import express
const router = express.Router(); 

let users = [
     {
          firstName : "Srujan",
          lastName: "Jadav",
          email:"sruja123@gmaul.com",
          DOB: "12-08-2005",
     },

     {
          firstName: "Medha",
          lastName: "Singh",
          email: "medha123@gmail.com",
          DOB: "03-07-2005",
     },

     {
          firstName: "Joyal",
          lastName: "white",
          email: "joyal123@gmail.com",
          DOB: "21-040-200",
     },

];


router.get("/",(req,res)=>
{
     res.send(JSON.stringify({users}, null, 4));
});

router.get("/:email",(req,res) =>
{
     const email = req.params.email;
     let filtered_user = req.params.filter((user)=> user.email==email);
     res.send(filtered_user);
});

router.post("/new/",(req,res) =>
{
     user.push({
          "firstName": req.query.firstName,
          "lastName":req.query.lastName,
          "email":req.query.email,
          "DOB":req.query.DOB
     });
  res.send("The user " + req.query.firstName + " has been added!");
});

router.put("/:email", (req, res) => {
    // Extract email parameter and find users with matching email
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    
    if (filtered_users.length > 0) {
        // Select the first matching user and update attributes if provided
        let filtered_user = filtered_users[0];
        
         // Extract and update DOB if provided
        
        let DOB = req.query.DOB;    
        if (DOB) {
            filtered_user.DOB = DOB;
        }
        
        /*
        Include similar code here for updating other attributes as needed
        */
        
        // Replace old user entry with updated user
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        
        // Send success message indicating the user has been updated
        res.send(`User with the email ${email} updated.`);
    } else {
        // Send error message if no user found
        res.send("Unable to find user!");
    }
});

router.delete("/:email", (req,res)=>
{
     const email = req.params.email;
     users = users.filter((user) => user.email != email);
     res.send(`User with the email ${email} deleted.`);
});

module.exports = router;   

