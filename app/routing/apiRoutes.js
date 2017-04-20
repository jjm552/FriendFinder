// LOAD

var friends = require("../data/friends");

// ROUTING
module.exports = function(app) {

    //API GET request
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // API POST request
    app.post("/api/friends", function(req, res) {
        friends.push(req.body);
    });
};