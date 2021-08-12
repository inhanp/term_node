const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    task: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now },
    dueDate: {type:Date, default: Date.now}
});

schema.index({createdDate:1, createdBy:1}, { unique: true });

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Todo', schema);
