const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    collection : { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' , required : true}, //the collection containing this item
    type : { type:String , enum : ['livre','film','musique'], required : true},
    titre : { type : String , required : true},
    auteur : { type: String },
    publicationDate : { type: Date },
    description : { type : String },
    editor : { type : String , default : "no editor"},
    imageLink : { type : String },
    isbn : { type : Number , default : 0 },
    price : { type : Number },
    pageNumber : { type : Number },
    itemImgURL : {type: String}
})
module.exports = mongoose.model('Item',ItemSchema)