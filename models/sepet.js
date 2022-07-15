const mongoose = require("mongoose")
const Schema = mongoose.Schema

var siparisSchema = ({
kullaniciId:{
type:String,
require:true,
},
fiyat:{
type:Number,
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
durum:{
type:String,
require:true, 
}
})

var siparis = mongoose.model('Sepet', siparisSchema)
module.exports = siparis
