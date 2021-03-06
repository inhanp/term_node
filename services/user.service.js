const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;



module.exports = {
    authenticate,
    getAllUsers,
    getByUsername,
    addUser,
    setGoals,
    getGoals,
    find
}

async function authenticate({ username, password }) {

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAllUsers() {
    //Returning the result of the promise.
    return await User.find().select('-hash');
}



async function getByUsername(username) {

    return await User.find({username:username});
}

async function addUser(userParam) {

    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

}


// complete this function. It takes in calories and minute goal values in 'values' and saves it for a given userid (_id). Hint: use 'updateOne' from mongoose.
async function setGoals(values, userid){
    const user = await User.findOne({ _id: userid });
    await user.updateOne({ caloriegoal: values.calories });
    await user.updateOne({ minutegoal: values.minutes });
}


// complete this function. It should return calorie and minute goals for a given user.
async function getGoals(username){
    const user = await User.findOne({ username: username });
    return {goals: {caloriegoal: user.caloriegoal, minutegoal: user.minutegoal}};
}

async function find(userId) {
    const user = await User.findOne({ _id: userId});
    return user.username;
}
