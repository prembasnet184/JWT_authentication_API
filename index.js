const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 3002;
const secretKey = "secretKey";

// app.get('/',(reeq,res)=>{
//     res.json({
//         message:"hello this is a sample API."
//     })
// })

app.post("/login", (req, res) => {
  const userDetails = {
    id: 1,
    name: "ayush basnet",
    username: "basnetayush123",
    email: "basnetayush174@gmail.com",
  };
  jwt.sign({ userDetails }, secretKey, { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.send({ result: "sorry, Token is invalid" })
    } else {
      res.json({
        message: "congratulation, You have accessed your profile",
        authData,
      });
    }
  });
});
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    result: "token is invalid";
  }
}

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
