const FindoutUser = require("../model/userModel");
const bcryot = require("bcrypt");

module.exports.register = async (req,res,next) =>{
    try{
        const{username,email,password,typerole}=req.body;
    const usernameCheck = await FindoutUser.findOne({username});
    if(usernameCheck)
        return res.json({msg:"Username already exist, Try another one", status: false});
    const emailCheck = await FindoutUser.findOne({email});
    if(emailCheck)
        return res.json({msg:"Email is already exist, Try another one", status: false});
    const hashedPassword = await bcryot.hash(password,10);
    const user =await FindoutUser.create({
        email,
        username,
        typerole,
        password: hashedPassword,
    });
    delete user.password;
    return res.json({status: true, user});
    } catch(ex){
        next(ex)
    }
};


module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userC = await FindoutUser.findOne({ username });
        if (!userC)
            return res.json({ msg: "User details not found", status: false });
        
        const isPasswMatch = await bcryot.compare(password, userC.password);
        if (!isPasswMatch)
            return res.json({ msg: "Incorrect username or password", status: false });
        
        delete userC.password;
        return res.json({ status: true, userC });
    } catch (ex) {
        next(ex);
    }
};
