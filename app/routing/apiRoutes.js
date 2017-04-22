// LOAD

var friends = require("../data/friends");

// Friend constructor used in API POST request to build new friends
function FriendConstruct(name, photo, scores) {
    this.name = name;
    this.photo = photo;
    this.scores = scores;
}


// ROUTING
module.exports = function(app) {

    //API GET request
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // API POST request
    app.post("/api/friends", function(req, res) {
        userEntry = req.body;
        newFriend = new FriendConstruct(userEntry.name, userEntry.photo, userEntry.scores);
        friends.push(newFriend);

        // arry for compaing current user scores to stored scores
        var friendMatch = [];

        // loop through friends array
        for (var i = 0; i < friends.length - 1; i++) {

            var totalDiff = 0;
            // loop throught the scores of each friend and compare to user
            for (var j = 0; j < newFriend.scores.length; j++) {
                if (newFriend.scores[j] != friends[i].scores[j]) {
                    totalDiff += Math.abs(newFriend.scores[j] - friends[i].scores[j]);
                }
            }
            console.log(totalDiff);
            friendMatch.push(totalDiff);
        }
        // displays total difference of each stored friened compared to user and removes user scores for match process
        console.log("match: " + friendMatch);
        friendMatch.pop();
        // function to return smallest value in an array
        Array.min = function(array) {
            return Math.min.apply(Math, array);
        };
        // retunrs the index of best match / firend with the least total difference
        var min = friendMatch.indexOf(Array.min(friendMatch));
        console.log(min);
        // uses the min from above for index of friends array to send front end
        res.json(friends[min]);

    });
};