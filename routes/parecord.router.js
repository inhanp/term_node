const express = require('express');
const router = express.Router();
const parecordController = require('../controllers/parecord.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/addparecord', parecordController.createPArecord);
router.get('/getparecords', parecordController.getPArecords);
router.delete('/:date',authorize(Role.admin), parecordController.deletePArecord);
router.post('/editparecord/', parecordController.editPArecord);
router.get('/getaverages/:username', parecordController.averagePArecord);


module.exports = router;
