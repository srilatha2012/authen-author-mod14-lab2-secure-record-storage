const router = require("express").Router();

const {User} = require("../../models/User");
const {signToken} = require("../../Utils/auth");


//POST /api/users/register - create a new user
router.post("/register", async (req, res) =>{
  try {
        const user = await User.create(req.body);
        const token = signToken(user);
        res.status(201).json({token, user});
  }catch(error) {
    res.status(400).json(error)
  }
});

//POST /api/users/login - Authenticate a user and return a token
router.post("/login", async (req, res) =>{
    const user = await User.findOne({email: req.body.email});

    if(!user) {
         return res.status(400).json({ message: "Can't find this user" });
    }
    const correctpw = await user.isCorrectPassword(req.body.password);

    if(!correctpw) {
        return res.status(400).json({message: "Wrong password!"});
    }
    const token = signToken(user);
    res.json({token, user});
});

module.exports = router;




