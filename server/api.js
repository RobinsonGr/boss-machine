const express = require('express');
const checkMillionDollarIdea = require('./checkMillionDollarIdea')
const apiRouter = express.Router();
const db = require('./db');
`const { app } = require('tailwind');
const { default: meetings } = require('../browser/store/meetings');`

const workRouter = express.Router({mergeParams: true})

apiRouter.use('/:minions/:minionId/work', workRouter)
apiRouter.use('/:modelType/:id', (req, res, next) => {

    const {modelType, id} = req.params;
    const idExist = db.getFromDatabaseById(modelType, id)

    if(idExist) {
        req.modelType = modelType;
        req.id = id;
    } else {
        res.status(404).send('doesn\'t exist')
    }

    next()
});
apiRouter.post('/ideas/', checkMillionDollarIdea, (req, res, next) => {
    res.status(201).send(db.addToDatabase('ideas', req.body));
});

apiRouter.post('/meetings/', (req, res, next) => {
    const meetingCreated = db.createMeeting()
    console.log(meetingCreated)
    res.status(201).send(db.addToDatabase('meetings', meetingCreated));
}) 


apiRouter.get('/:modelType', (req, res, next) => {
  
    res.send(db.getAllFromDatabase(req.params.modelType))
});


apiRouter.get('/:modelType/:id/', (req, res, next) => {
    res.send(db.getFromDatabaseById(req.modelType, req.id));
    
});

apiRouter.post('/:modelType/', (req, res, next) => {

    const modelType = req.params.modelType;


    res.status(201).send(db.addToDatabase(modelType, req.body));
});




apiRouter.put('/:modelType/:id', (req, res, next) => {
    res.send(db.updateInstanceInDatabase(req.modelType, req.body));
});

apiRouter.delete('/meetings/', (req, res, next) => {

    res.status(204).send(db.deleteAllFromDatabase('meetings'));
});

apiRouter.delete('/:modelType', (req, res, next) => {

    res.send(db.deleteAllFromDatabase(req.params.modelType));
});

apiRouter.delete('/:modelType/:id', (req, res, next) => {
    const deleted = db.deleteFromDatabasebyId(req.modelType, req.id);
    if(!deleted) {
        res.status(500).send('it did\t delate')
    }
    res.status(204).send();
});


//workRouter


workRouter.get('/', (req, res) => {
    res.send(db.getAllFromDatabase('work'))
});

workRouter.get('/:workId', (req, res) => {
    res.send(db.getFromDatabaseById('work', req.params.workId))
});

workRouter.post('/', (req, res) => {
    res.send(db.addToDatabase('work', req.body));
})

workRouter.put('/:workId', (req, res) => {
    res.send(db.updateInstanceInDatabase('work', req.params.workId));
})


workRouter.delete('/:workId', (req, res) => {
    res.send(db.deleteFromDatabasebyId('work', req.params.workId));
});



module.exports = apiRouter;


