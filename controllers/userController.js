const User = require('../models/user.model');

module.exports = {
    get: (req, res) => {
        User.find()
        .then(users => res.status(200).json({message: "Successfully get all users", data: users}))
        .catch(err => res.status(400).json('Error: ' + err));
    },

    add: (req, res) => {
        const username = req.body.username;
        const newUser = new User({username: username, score: 0});

        newUser.save()
            .then((x) => res.status(200).json({message: 'User Added!', data: x}))
            .catch(err => res.status(400).json('Error: ' + err));
    },

    ranking: (req, res) => {
        User.find().sort({"score":-1})
        .then(users => {
            var result = [];
            var counter = 1
            
            users.forEach(x => {
                let userObj = { rank: counter, username: x.username, score: x.score }
                result.push(userObj)
                counter++
            });
            
            res.status(200).json({message: "Successfully get ranking", data: result});
        })
        .catch(err => res.status(400).json('Error: ' + err));
    },

    reset: async (req, res) => {
        const data = req.body;
        const update = { score: 0 };
        let user = await User.findByIdAndUpdate(data.user_id, update, {
            new: true
        })
        .then((x) => res.status(200).json({message: "Reset successfully", data: x}))
        .catch(err => res.status(400).json('Error: ' + err));
    }
}