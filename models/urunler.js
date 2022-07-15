const mongoose = require("mongoose")
const Schema = mongoose.Schema

var urunlerSchema = new Schema ({
baslik:{
type:String,
require:true,
},
aciklama:{
type:String,
require:true,
},
fiyat:{
type:Number,
require:true,
},
marketId:{
type:String,
require:true,
},
market:{
type:String,
require:true,
},
kategori:{
type: String,
require:true,
},
foto:{
type:String,
require:true,
},
stok:{
type:Number,
require:true,
},
},{timestamps:true})

var urunler = mongoose.model('Urunler', urunlerSchema)
module.exports = urunler
