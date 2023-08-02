const checkMillionDollarIdea = (req, res, next) => {

    if (!(req.body.numWeeks * req.body.weeklyRevenue >= 1000000)) {
        return res.status(400).send();  
    } 
    next()

};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
