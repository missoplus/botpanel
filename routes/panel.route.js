const express = require('express')
const router = express.Router()

//Services
const serviceController = require('../controllers/panel/services/serviceController.js');
const serviceRouter = express.Router();
serviceRouter.get('/', serviceController.getAll);
serviceRouter.get('/add', serviceController.getAddServiceView);
serviceRouter.post('/add', serviceController.create);
serviceRouter.get('/:id', serviceController.getUpdateView);
serviceRouter.post('/:id', serviceController.updateById);
serviceRouter.get('/delete/:id', serviceController.deleteById);
router.use('/services', serviceRouter);

//SERVERS
const serverController = require('../controllers/panel/servers/serverController.js');
const serverRouter = express.Router();
serverRouter.get('/', serverController.getAll);
serverRouter.get('/add', serverController.getAddServerView);
serverRouter.post('/add', serverController.create);
serverRouter.get('/:id', serverController.getUpdateView);
serverRouter.post('/:id', serverController.updateById);
serverRouter.get('/delete/:id', serverController.deleteById);
router.use('/servers', serverRouter);

//Tutorials
const tutorialController = require('../controllers/panel/tutorials/tutorialController');
const tutorialRouter = express.Router();
tutorialRouter.get('/', tutorialController.getAll);
tutorialRouter.get('/add', tutorialController.getAddTutorialView);
tutorialRouter.post('/add', tutorialController.create);
tutorialRouter.get('/:id', tutorialController.getUpdateView);
tutorialRouter.post('/:id', tutorialController.updateById);
tutorialRouter.get('/delete/:id', tutorialController.deleteById);
router.use('/tutorials', tutorialRouter);

//Connections
const connectionController = require('../controllers/panel/connections/connectionController');
const connectionRouter = express.Router();
connectionRouter.get('/', connectionController.getAll);
connectionRouter.get('/add', connectionController.getAddConnectionView);
connectionRouter.post('/add', connectionController.create);
connectionRouter.get('/:id', connectionController.getUpdateView);
connectionRouter.post('/:id', connectionController.updateById);
connectionRouter.get('/delete/:id', connectionController.deleteById);
router.use('/connections', connectionRouter);

//Faqs
const faqController = require('../controllers/panel/faqs/faqController');
const faqRouter = express.Router();
faqRouter.get('/', faqController.getAll);
faqRouter.get('/add', faqController.getAddFaqView);
faqRouter.post('/add', faqController.create);
faqRouter.get('/:id', faqController.getUpdateView);
faqRouter.post('/:id', faqController.updateById);
faqRouter.get('/delete/:id', faqController.deleteById);
router.use('/faqs', faqRouter);
//todo mongoose.types.objectId
//todo updateById && selectOption
//todo userList api
//Users
router.get('/', (req, res) => {
    res.render("admin/home", {layout: 'admin/dashboard'});
});
module.exports ={
    routes: router
}
