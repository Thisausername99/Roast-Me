const bcrypt = require('bcrypt');
const User  = require('./../model/user');
const {forSignup, forLogin} = require('./../auth/validate');

async function signup (req, res) {
    const {error} = forSignup(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const userExist = await User.exists({"personal.email":req.body.personal.email});
        if (userExist) {
            return res.json({ success: false, error: 400, errmsg: "User already registered."});
        }
        // console.log("decryting pw...");
        // console.log(req.body.password);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        // Create new User
        const usr = new User({
            personal: req.body.personal,
            password : hash
        })
        const usrSaved = await usr.save(); // upload user to db
            return res.json({success : true, user : usrSaved}); //send msg
    }
    catch (err){
        res.json({ success: false, code: 500, errmsg: err.body }); //if error occur
    }
}

// handle login
async function login (req, res) {
    const {error} = forLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        // check user unique email in db
        const usr = await User.findOne({"personal.email":req.body.personal.email});
        if (!usr){
            res.json({ success: false, error: 404, errmsg: "email does not exits" });
        }
        else {
            //check password
            const pwMatch = await bcrypt.compare(req.body.password, usr.password);
            if (pwMatch){
                return res.json({success: true, code : 200});
        } else {
            return res.json({ success: false, error: 400, errmsg: "password is not correct"});
            }
        }
    }
    catch(err){
        res.json({ success: false, code: 500, errmsg: err.body });
    }
};


//handle delete a user
async function removeUser (req, res){
    try {
    const usr = await User.deleteOne({"_id":req.params._id});
        res.send({success: true, code : 200});
    }
    catch(err){
        res.json({ success: false, code: 500, errmsg: err.body });
    }
}

async function modify(req,res){


}


exports.signup = signup;
exports.login = login;
exports.delete = removeUser;