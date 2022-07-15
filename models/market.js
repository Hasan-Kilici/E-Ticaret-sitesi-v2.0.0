const mongoose = require("mongoose")
const Schema = mongoose.Schema

var yorumlarSchema = new Schema ({
isim:{
type:String,
require:true,
},
logo:{
type:String,
require:true,
},
liyakat:{
type:Number,
require:true,
}
})

var yorumlar = mongoose.model('Marketler', yorumlarSchema)
module.exports = yorumlar
