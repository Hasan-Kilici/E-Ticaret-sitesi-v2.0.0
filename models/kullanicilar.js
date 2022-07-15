const mongoose = require("mongoose")
const Schema = mongoose.Schema

var kullanicilarSchema = new Schema ({
kullanici_adi:{
type:String,
require:true,
},
sifre:{
type:String,
require:true,
},
email:{
type:String,
require:true,
},
admin:{
type:String,
require:true,
},
marketAdmin:{
type:String,
require:true,
},
marketId:{
type:String,
require:true,
},
cc:{
type:String,
require:true,
},
adres:{
type:String,
reqiure:true,
},
tel:{
type:String,
reqiure:true,  
},
market:{
type:String,
reqiure:true,  
},
liyakat:{
type:Number,
require:true,
},
begeni:{
type:Array,
require:true,
}
})

var kullanicilar = mongoose.model('Kullanicilar', kullanicilarSchema)
module.exports = kullanicilar
