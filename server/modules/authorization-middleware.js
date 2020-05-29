const rejectUnauthorized = (req, res, next) => {
    // check if logged in
    console.log("rejectUnauthorized :: ", req.isAuthenticated(), req.user)
    if (req.isAuthenticated() && req.user.admin) {
        // They were authenticated! User may do the next thing
        // Note! They may not be Authorized to do all things
        next();
    } else {
        // failure best handled on the server. do redirect here.
        res.sendStatus(403);
    }
};

module.exports = { rejectUnauthorized };