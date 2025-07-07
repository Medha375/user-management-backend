app.use(session({secret:"fingerprint",resave: true, saveUninitialized: true}))

app.post("/login",(req,res)=>{
     const user = req.body.user;
     if(!user){
          return res.status(404).json({message: "Body Empty"});
     }

     let accessToken = jwt.sign({
          data:user
     }, 'access',{expiresIn: 60*60});

     req.session.authorization ={
          accessToken
     }
     return res.status(200).send("User successfully logged in");
});

// Middleware for user authentication
app.use("/user", (req, res, next) => {
    // Check if user is authenticated
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken']; // Access Token
        
        // Verify JWT token for user authentication
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user; // Set authenticated user data on the request object
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" }); // Return error if token verification fails
            }
        });
        
        // Return error if no access token is found in the session
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});