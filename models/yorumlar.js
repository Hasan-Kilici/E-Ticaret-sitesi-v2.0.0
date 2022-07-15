const mongoose = require("mongoose")
const Schema = mongoose.Schema

var yorumlarSchema = new Schema ({
kullanici_adi:{
type:String,
require:true,
},
urunId:{
type:String,
require:true,
},
mesaj:{
type:String,
require:true,
},
like:{
type:Number,
require:true,
}
},{timestamps:true})

var yorumlar = mongoose.model('Yorumlar', yorumlarSchema)
module.exports = yorumlar
