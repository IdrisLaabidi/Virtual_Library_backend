const mongoose = require("mongoose")

const CollectionSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    title : {type : String , required : true},
    language : { type : String , enum : ['AR', 'FR' , 'EN','DE','IT']},
    items : [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}]
})

module.exports = new mongoose.model('Collection',CollectionSchema)
