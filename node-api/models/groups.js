var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    name:{ type: String, required: true },
    users:[
        {
            _id:false,
            name:String,
            color:String
        }
    ]
},{
  usePushEach: true
});

module.exports = mongoose.model('Group', groupSchema);