const jwt = require("jsonwebtoken");
const secret=process.env.JWT_SECRET;
const expiration = '2h';


/*
JWT Authentication
It does 2 jobs
1. signToken -> create JWT token after login/signup
2. authMiddleware -> verify token before allowing protected routes
*/
module.exports ={
    authMiddleware :function(req, res, next) {
        /* api/notes?token=abc123 not recommended because URLs can be saved in browser history, logs,etc
        req.body.token works only for POST/PUT requests, not normal GET requests
        Authorization header = best practice
        */
        let token = req.body.token || req.query.token || req.headers.authorization;
        if(req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if(!token) {
            return res.status(401).json({message: "You must be logged in to do that."})
        }
        try {
            const { data } = jwt.verify(token, secret, {maxAge: expiration});
            req.user = data;
        } catch(error){
            console.log('Invalid token', error.message);
            return res.status(401).json({message: "Invalid token"});
        }
        next();
    },
    signToken: function ({username, email, _id}) {
        const payload = {username, email, _id};

        return jwt.sign({data: payload}, secret, {expiresIn: expiration});
    },
}