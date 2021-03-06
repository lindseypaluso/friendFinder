// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
var friends = require("../data/friends.js")

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    })

    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        var answers = req.body.scores;
        var bestMatch;
        var bestMatchScoreDifference = 1000000;
        var currentDiff;

        // newFriend = newFriend.name.replace(/\s+/g, "").toLowerCase();
        // loop over friends
        for (var i = 0; i < friends.length; i++) {
            currentDiff = 0;

            // loop over answers
            for (var j = 0; j < answers.length; j++) {
                currentDiff += Math.abs(parseInt(friends[i].scores[j]) - parseInt(answers[j]));  
            }
            // check if the current difference is less than the bestMatchScoreDifference
            if (currentDiff < bestMatchScoreDifference) {
                bestMatchScoreDifference = currentDiff
                bestMatch = friends[i];
            }
            // if yes, update the best match score diff = current diff

        }
 
        // console.log(newFriend);

        friends.push(newFriend);
        console.log(bestMatch);
        res.json(bestMatch);
    })
}

// Determine the user's most compatible friend using the following as a guide:
// Convert each user's results into a simple array of numbers (ex: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1])


// With that done, compare the difference between current user's scores against those from other users, question by question. (Loop over friends, and then loop over answers for each friend) Add up the differences to calculate the totalDifference.
// Example:
// User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
// User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
// Total Difference: 2 + 1 + 2 = 5
// Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both 5-3 and 3-5 as 2, and so on.
// The closest match will be the user with the least amount of difference.
// Once you've found the current user's most compatible friend, display the result as a modal pop-up.
// The modal should display both the name and picture of the closest match.