const express 			= require('express');
const router 			= express.Router();

const CandidatController 	= require('../controllers/candidat.controller');
const PosteController = require('../controllers/poste.controller');
const HomeController 	= require('../controllers/home.controller');

const custom 	        = require('./../middleware/custom');

const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport)
/* GET Test page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Kea Webservice Started Pending API", data:{"version_number":"v1.0.0"}})
});


router.post(    '/candidat',           CandidatController.create);                                                    // C
// router.get(     '/candidat',           passport.authenticate('jwt', {session:false}), CandidatController.get); 	      // R
router.get(     '/candidat',           passport.authenticate('jwt', {session:false}), CandidatController.getAll);        // R
router.put(     '/candidat',           passport.authenticate('jwt', {session:false}), CandidatController.update);     // U
router.delete(  '/candidat',           passport.authenticate('jwt', {session:false}), CandidatController.remove);     // D
router.post(    '/candidat/login',     CandidatController.login);

router.post(    '/poste',             passport.authenticate('jwt', {session:false}), PosteController.create);                  // C
router.get(     '/poste',             passport.authenticate('jwt', {session:false}), PosteController.getAll);                  // R

router.get(     '/poste/:posteId', passport.authenticate('jwt', {session:false}), custom.poste, PosteController.get);     // R
router.put(     '/poste/:posteId', passport.authenticate('jwt', {session:false}), custom.poste, PosteController.update);  // U
router.delete(  '/poste/:posteId', passport.authenticate('jwt', {session:false}), custom.poste, PosteController.remove);  // D

router.get('/dash', passport.authenticate('jwt', {session:false}),HomeController.Dashboard)


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;
