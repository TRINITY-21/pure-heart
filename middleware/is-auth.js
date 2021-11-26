module.exports = (req,res,next)=>{
    if(req.session.isLoggedin == true){
        return res.redirect('/login')
    }
    next();
}