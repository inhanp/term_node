const db = require('../_helpers/database');
const PArecord = db.PArecord;


module.exports = {
    getAllPArecords,
    addPArecord,
    deletePArecord
}


// write the necessary functions that will address the needs of parecord.controller. Hint: look at the signatures in the module.exports. Hint2: look at user.service to see how you can interact with the database. Hint3: look at the class material.

async function getAllPArecords() {
    return await PArecord.find().select('-hash');
}


async function addPArecord(parecord, username) {


    // validate
    if (await PArecord.findOne({ createdBy: username, createdDate: parecord.createdDate  })) {
        throw 'Parecord created by"' + parecord.createdBy +" on "+ parecord.createdDate +'" already exists';
    }
    else if(!username){
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }
    //populate missing fields in the parecord object
    let newrecord= parecord;
    parecord.createdBy = username;
    parecord.createdDate =  Date.now();

    dbrecord = new PArecord(newrecord);


    // save the record
    await dbrecord.save();

}

async function deletePArecord(date, userId) {
    record = await PArecord.findOne({ createdDate: date });
    if (userId == record.createdBy) {
        record.remove();
        return 1;
    }
    else {
        return 0;
    }
}
