/*
KAWETHRA.JS V.0.0.5
YAKIN ZAMANDA SUNACAĞIM
*/
var element;
//Geliştiriden Mesaj
console.log("%cBu Framework Kawethra Tarafından Yazılmıştır",'color:red;font-size:25px;');
console.log("%cBu Frameworkun Amacı JS'de ki CSS'i kolaylaştırmak için yapıldı", 'color:green;font-size:20px;');
//Basic Functions
function log(message){console.log(message)}
function warn(message){alert(message)}
//Tasarımsal
//Sakla
function hide(query, delay){
var time = delay / 1000
if(delay == undefined){document.querySelector(query).style.display = "none"}
else{
document.querySelector(query).style.transition = `all ${time}s`;
setTimeout(()=>{document.querySelector(query).style.opacity = 0;},10)
setTimeout(()=>{document.querySelector(query).style.display = "none";  },delay)}
}
//Göster
function show(query, delay){
var time = delay / 1000
if(delay == undefined){document.querySelector(query).style.display = "block"}
else{
document.querySelector(query).style.transition = `all ${time}s`;
setTimeout(()=>{document.querySelector(query).style.opacity = 1;},10)
setTimeout(()=>{document.querySelector(query).style.display = "block";  },delay)}
}
//CSS
function css(query,PROPERTY, value, err){
PROPERTY = PROPERTY.toLowerCase();
if(PROPERTY == "background"){document.querySelector(query).style.background = value;}
if(PROPERTY == "background-attachment"){document.querySelector(query).style.backgroundAttachment = value;}
if(PROPERTY == "background-color"){document.querySelector(query).style.backgroundColor = value;}
if(PROPERTY == "background-image"){document.querySelector(query).style.backgroundImage = value;}
if(PROPERTY == "background-position"){document.querySelector(query).style.backgroundPosition = value;}
if(PROPERTY == "background-repeat"){document.querySelector(query).style.backgroundRepeat = value;}
if(PROPERTY == "border"){document.querySelector(query).style.border = value;}
if(PROPERTY == "border-collapse"){document.querySelector(query).style.borderCollapse = value;}
if(PROPERTY == "border-color"){document.querySelector(query).style.borderColor = value;}
if(PROPERTY == "border-top-color"){document.querySelector(query).style.borderTopColor = value;}
if(PROPERTY == "border-right-color"){document.querySelector(query).style.borderRightColor = value;}
if(PROPERTY == "border-bottom-color"){document.querySelector(query).style.borderBottomColor = value;}
if(PROPERTY == "border-left-color"){document.querySelector(query).style.borderLeftColor = value;}
if(PROPERTY == "border-spacing"){document.querySelector(query).style.borderSpacing = value;}
if(PROPERTY == "border-style"){document.querySelector(query).style.borderStyle = value;}
if(PROPERTY == "border-top-style"){document.querySelector(query).style.borderTopStyle = value;}
if(PROPERTY == "border-left-style"){document.querySelector(query).style.borderLeftStyle = value;}
if(PROPERTY == "border-bottom-style"){document.querySelector(query).style.borderBottomStyle = value;}
if(PROPERTY == "border-right-style"){document.querySelector(query).style.borderRightStyle = value;}
if(PROPERTY == "border-top"){document.querySelector(query).style.borderTop = value;}
if(PROPERTY == "border-left"){document.querySelector(query).style.borderLeft = value;}
if(PROPERTY == "border-bottom"){document.querySelector(query).style.borderBottom = value;}
if(PROPERTY == "border-right"){document.querySelector(query).style.borderRight = value;}
if(PROPERTY == "border-width"){document.querySelector(query).style.borderWidth = value;}
if(PROPERTY == "border-top-width"){document.querySelector(query).style.borderTopWidth = value;}
if(PROPERTY == "border-left-width"){document.querySelector(query).style.borderLeftWidth = value;}
if(PROPERTY == "border-bottom-width"){document.querySelector(query).style.borderBottomWidth = value;}
if(PROPERTY == "border-right-width"){document.querySelector(query).style.borderRightWidth = value;}
if(PROPERTY == "bottom"){document.querySelector(query).style.bottom = value;}
if(PROPERTY == "caption-side"){document.querySelector(query).style.captionSide = value;}
if(PROPERTY == "clear"){document.querySelector(query).style.clear = value;}
if(PROPERTY == "color"){document.querySelector(query).style.color = value;}
if(PROPERTY == "content"){document.querySelector(query).style.content = value;}
if(PROPERTY == "letter-spacing"){document.querySelector(query).style.letterSpacing = value;}
if(PROPERTY == "cursor"){document.querySelector(query).style.cursor = value;}
if(PROPERTY == "direction"){document.querySelector(query).style.direction = value;}
if(PROPERTY == "display"){document.querySelector(query).style.display = value;}
if(PROPERTY == "empty-cells"){document.querySelector(query).style.emptyCells = value;}
if(PROPERTY == "float"){document.querySelector(query).style.float = value;}
if(PROPERTY == "font-family"){document.querySelector(query).style.fontFamily = value;}
if(PROPERTY == "font-size"){document.querySelector(query).style.fontSize = value;}
if(PROPERTY == "font-style"){document.querySelector(query).style.fontStyle = value;}
if(PROPERTY == "font-variant"){document.querySelector(query).style.fontVariant = value;}
if(PROPERTY == "font-weight"){document.querySelector(query).style.fontWeight = value;}
if(PROPERTY == "font"){document.querySelector(query).style.font = value;}
if(PROPERTY == "height"){document.querySelector(query).style.height = value;}
if(PROPERTY == "left"){document.querySelector(query).style.left = value;}
if(PROPERTY == "line-height"){document.querySelector(query).style.lineHeight = value;}
if(PROPERTY == "list-style-image"){document.querySelector(query).style.listStyleImage = value;}
if(PROPERTY == "list-style-position"){document.querySelector(query).style.listStylePosition = value;}
if(PROPERTY == "list-style-type"){document.querySelector(query).style.listStyleType = value;}
if(PROPERTY == "list-style"){document.querySelector(query).style.listStyle = value;}
if(PROPERTY == "margin"){document.querySelector(query).style.margin = value;}
if(PROPERTY == "margin-top"){document.querySelector(query).style.marginTop = value;}
if(PROPERTY == "margin-left"){document.querySelector(query).style.marginLeft = value;}
if(PROPERTY == "margin-bottom"){document.querySelector(query).style.marginBottom = value;}
if(PROPERTY == "margin-right"){document.querySelector(query).style.marginRight = value;}
if(PROPERTY == "max-height"){document.querySelector(query).style.maxHeight = value;}
if(PROPERTY == "max-width"){document.querySelector(query).style.maxWidth = value;}
if(PROPERTY == "orphans"){document.querySelector(query).style.orphans = value;}
if(PROPERTY == "outline-color"){document.querySelector(query).style.outlineColor = value;}
if(PROPERTY == "outline-style"){document.querySelector(query).style.outlineStyle = value;}
if(PROPERTY == "outline-width"){document.querySelector(query).style.outlineWidth = value;}
if(PROPERTY == "outline"){document.querySelector(query).style.outline = value;}
if(PROPERTY == "overflow"){document.querySelector(query).style.overflow = value;}
if(PROPERTY == "padding"){document.querySelector(query).style.padding = value;}
if(PROPERTY == "padding-top"){document.querySelector(query).style.paddingTop = value;}
if(PROPERTY == "padding-left"){document.querySelector(query).style.paddingLeft = value;}
if(PROPERTY == "padding-bottom"){document.querySelector(query).style.paddingBottom = value;}
if(PROPERTY == "padding-right"){document.querySelector(query).style.paddingRight = value;}
if(PROPERTY == "position"){document.querySelector(query).style.position = value;}
if(PROPERTY == "quotes"){document.querySelector(query).style.quotes = value;}
if(PROPERTY == "right"){document.querySelector(query).style.right = value;}
if(PROPERTY == "table-layout"){document.querySelector(query).style.tableLayout = value;}
if(PROPERTY == "text-align"){document.querySelector(query).style.textAlign = value;}
if(PROPERTY == "text-decoration"){document.querySelector(query).style.textDecoration = value;}
if(PROPERTY == "text-indent"){document.querySelector(query).style.textIndent = value;}
if(PROPERTY == "text-transform"){document.querySelector(query).style.textTransform = value;}
if(PROPERTY == "top"){document.querySelector(query).style.top = value;}
if(PROPERTY == "vertical-align"){document.querySelector(query).style.verticalAlign = value;}
if(PROPERTY == "visibility"){document.querySelector(query).style.visibility = value;}
if(PROPERTY == "white-space"){document.querySelector(query).style.whiteSpace = value;}
if(PROPERTY == "width"){document.querySelector(query).style.width = value;}
if(PROPERTY == "word-spacing"){document.querySelector(query).style.wordSpacing = value;}
if(PROPERTY == "z-index"){document.querySelector(query).style.zIndex = value;}
}
//Events
function addClick(query, fonksiyon){document.querySelector(query).onclick = ()=>{eval(fonksiyon)}}
