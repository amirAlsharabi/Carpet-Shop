const isAdmin = (req, res, next) => {
    if(req.session.user && req.session.user.role === "admin"){
        return next();
    }
    return res.status(403).send("Access Denied: Admins Only.")
}

module.exports = isAdmin;