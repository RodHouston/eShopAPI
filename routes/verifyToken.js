const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // console.log(req); 

  const authHeader = req.headers.token;
  const token = authHeader.split(" ")[1];
  // console.log('yo auth');
  // console.log(token);


  if (token === 'undefined'){
    return console.log('we getting close')
  }

  if (authHeader) {    
    const token = authHeader.split(" ")[1];    
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      // console.log(token);
      // console.log(req);
      next();
    });
  } else {
    console.log('error');
    return res.status(401).json("You are not authenticated!");
  }
  // console.log('error');
  // console.log('yo'); 
}; 

const verifyTokenAndAuthorization = (req, res, next) => {
  // console.log(req);
  // console.log('here');
  verifyToken(req, res, () => {
    
    // console.log('there');
    // console.log(req.body);
    if (req.user.id === req.params.userId || req.user.isAdmin) { 
      next();
    } else {
      return res.status(403).json("You are not allowed to do that!");
    }
  }); 
};
  
const verifyTokenAndAdmin = (req, res, next) => {
  //  console.log(req.body);
  verifyToken(req, res, () => {
    //  console.log(req.user);
    if (req.user.isAdmin) {  
      next();  
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};