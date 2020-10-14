const axios = require('axios');
const Question = require('../models/question.model');
const User  = require('../models/user.model');

module.exports = {
    create: async (req, res) => {
        const result = await axios.get('https://opentdb.com/api.php?amount=1');
        const data = result.data.results[0];
        
        let newQuestion = new Question(data);

        newQuestion.save()
            .then((x) => res.status(200).json({message: 'Question added!', data: x}))
            .catch(err => res.status(400).json('Error: ' + err));
    },

    get: async (req, res) => {
        Question.count().exec(function(err, count){
            var rnd = Math.floor(Math.random() * count)
    
            Question.findOne().skip(rnd).exec(
                function (err, data) {
                    var options = data.incorrect_answers;
                    options.push(data.correct_answer);
                    var result = {
                        category: data.category,
                        type: data.type,
                        difficulty: data.type,
                        question: data.question,
                        options: options
                    };
                    res.status(200).json({message: "Succesfully get Trivia Question", data: result});
                }
            )
        });
    },

    answer: async (req, res) => {
        try {
            const data = req.body;
            let question = await Question.findById(data.question_id);
        
            let user  = await User.findById(data.user_id);
            
            if (data.answer === question.correct_answer) {
                const update = { score: user.score + 1 };
                let updateUser = await User.findByIdAndUpdate(data.user_id, update, {
                    new: true
                });
                
                return res.status(200).json({score: updateUser.score, answer: true})
            }
        
            return res.status(200).json({score: user.score, answer: false})
        } catch (err) {
            return res.status(400).json({Error: err});
        };
    }
}