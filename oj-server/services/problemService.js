
const ProblemModel = require('../models/problemModel');

const getProblems = function() {
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, (err, problems) => {
            if (err) {
                reject(err);
            } else {
                resolve(problems);
            }
        });
    });
}

const getProblem = function(idNumber) {
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({id: idNumber}, (err, problem) => {
            if (err) {
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
}

const addProblem = function(newProblem) {
    return new Promise((resolve, reject) => {
        // check
        ProblemModel.findOne({name: newProblem.name}, (err, data) => {
            if (data) {
                reject('Problem already exists!');
            } else {
                // save to mongodb
                ProblemModel.count({}, (err, count) => {
                    newProblem.id = count + 1;
                    const mongoProblem = new ProblemModel(newProblem);
                    mongoProblem.save();
                    resolve(mongoProblem);
                });
            }
        });
    });
}

module.exports = {
    getProblems,
    getProblem,
    addProblem
}