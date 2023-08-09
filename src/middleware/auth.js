const jwt = require('jsonwebtoken');
const SECRET_KEY = "UsWeThem";

const auth = (req,res,next) => {
    try {
        let token = req.headers.authorization;
        if(!token) {
            return res.status(401).json({error:'Access Denied'});
        }
        else
        {
            token = token.split(" ")[1];
            const verifiedUser = jwt.verify(token,SECRET_KEY);
            req.user = verifiedUser
        }
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({error : "Unauthorized User"});
    }
};

module.exports = auth;