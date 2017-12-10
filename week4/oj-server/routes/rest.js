const express = require('express');
const router = express.Router();
const problemService = require('../services/problemService');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const nodeRestClient = require('node-rest-client').Client;
const restClient = new nodeRestClient();

EXECUTOR_SERVER_URL = 'http://localhost:5000/build_and_run';

restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

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

    restClient.methods.build_and_run(
        {
            data: {code: userCode, lang: lang},
            headers: { 'Content-Type': 'application/json'}
        },
        (data, response) => {
            const text = `Build output: ${data['build']}, Execute output: ${data['run']}`;
            data['text'] = text;
            res.json(data);
        }
    )
});

module.exports = router;