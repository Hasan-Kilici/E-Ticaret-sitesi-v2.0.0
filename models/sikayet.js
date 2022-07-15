const mongoose = require("mongoose")
const Schema = mongoose.Schema

var sikayetSchema = ({
kullanici:{
type:String,
require:true,
},
kullaniciId:{
type:String,
require:true  
},
kategori:{
type:String,
require:true   
},
sikayet:{
type:String,
require:true, 
},
market:{
type:String,
require:true,
},
marketId:{
type:String,
require:true,  
},
yorum:{
type:String,
require:true 
},
yorumId:{
type:String,
require:true 
},
sikayetci:{
type:String,
require:true   
},
sikayetciId:{
type:String,
require:true   
},
})

var sikayet = mongoose.model('Sikayetler', sikayetSchema)
module.exports = sikayet
