const parecordService = require('../services/parecord.service')

module.exports = {
    createPArecord,
    getPArecords,
    deletePArecord
};


function createPArecord(req, res, next) {
    parecordService.addPArecord(req.body, req.user.username).then().catch(err => next(err))
  //TODO: via parecordSerice you should add a PA record and respond to the client confirming that the record was successfully added.


}

function getPArecords(req,res,next){
//TODO: return all parecords from the database and send to the client.
    parecordService.getAllPArecords().then(paracords => res.json(paracords)).catch(err => next(err))
}


function deletePArecord(req,res,next){

//TODO: delete parecord from the database and respond to the client by conforming the action.

}
