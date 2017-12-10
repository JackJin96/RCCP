const express = require('express');
const router = express.Router();
const problemService = require('../services/problemService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//get problems
router.get('/problems', (req, res) => {
    problemService.getProblems()
        .then(problems => res.json(problems));
});

//get one problem
router.get('/problems/:id', (req, res) => {
    const id = req.params.id;
    problemService.getProblem(+id)
        .then(problem => res.json(problem));
});

//post problem
router.post('/problems', jsonParser, (req, res) => {
    problemService.addProblem(req.body)
        .then(problem => {
            res.json(problem);
        }, (error) => {
            res.status(400).send("Problem already exists!");
        });
});

//build and run
router.post('/build_and_run', jsonParser, (req, res) => {
    const userCode = req.body.userCode;
    const lang = req.body.lang;
    console.log('lang: ', lang, 'userCode: ' + userCode);
    res.json({'text': 'hello from node js'});
});

module.exports = router;