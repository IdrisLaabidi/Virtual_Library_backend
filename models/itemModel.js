const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    collection : { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' , required : true}, //the collection containing this item
    type : { type:String , enum : ['livre','film','musique','jeux-video'], required : true},
    titre : { type : String , required : true},
    description : { type : String },
    editor : { type : String },
    imageLink : { type : String },
    isbn : { type : Number },
    price : { type : Number },
    pageNumber : { type : Number },
    itemImgURL : {type: String}
})
module.exports = mongoose.model('Item',ItemSchema)