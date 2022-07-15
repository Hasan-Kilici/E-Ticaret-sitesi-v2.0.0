const mongoose = require("mongoose")
const Schema = mongoose.Schema

var siparisSchema = ({
kullanici:{
type:String,
require:true,
},
adres:{
type:String,
require:true
},
urun:{
type:String,
require:true,
},
urunId:{
type:String,
require:true,
},
marketId:{
type:String,
require:true,
},
sepetId:{
type:String,
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
tarih:{
type:String,
require:true,  
},
})

var siparis = mongoose.model('Siparisler', siparisSchema)
module.exports = siparis
