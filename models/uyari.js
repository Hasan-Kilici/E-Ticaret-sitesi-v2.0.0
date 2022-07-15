const mongoose = require("mongoose")
const Schema = mongoose.Schema

var uyariSchema = new Schema({
uyariSayi:{
type:Number,
require:true  
},
marketId:{
type:String,
require:true
},
market:{
type:String,
require:true  
},
kullaniciId:{
type:String,
require:true 
},
kullanici:{
type:String,
require:true  
},
mesaj:{
type:String,
require:true  
},
kategori:{
type:String,
require:true    
},
},{timestamps:true})

var uyari = mongoose.model('Uyarilar', uyariSchema)
module.exports = uyari
