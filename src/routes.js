const { Router } = require('express');

const IncidentController = require('./controllers/IncidentController');
const OngsController = require('./controllers/OngsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = Router();

routes.post('/ongs', OngsController.store);
routes.get('/ongs', OngsController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;
