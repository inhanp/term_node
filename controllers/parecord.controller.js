const parecordService = require('../services/parecord.service')

module.exports = {
    createPArecord,
    getPArecords,
    deletePArecord,
    editPArecord
};


function createPArecord(req, res, next) {
    parecordService.addPArecord(req.body, req.user.sub).then(paracord => res.json(paracord)).catch(err => next(err))
  // via parecordSerice you should add a PA record and respond to the client confirming that the record was successfully added.


}

function getPArecords(req,res,next){
// return all parecords from the database and send to the client.
    parecordService.getAllPArecords().then(paracords => res.json(paracords)).catch(err => next(err))
}


function deletePArecord(req,res,next){
    parecordService.deletePArecord(req.params.date, req.user.sub).then(parecord => res.json(parecord)).catch(err => next(err))
// delete parecord from the database and respond to the client by conforming the action.

}

function editPArecord(req, res, next) {
    parecordService.editPArecord(req.body, req.user.sub).then(parecord => res.json(parecord)).catch(err => next(err))
}
