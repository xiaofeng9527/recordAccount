var fs = require('fs');
var path= require('path')
if(fs.existsSync("./index.html")){  
        fs.unlink("./index.html",function(err){  
            if(err){  
                console.error();  
                throw err;  
            }  
            // console.log('文件删除成功');  
        });  
    }else{  
        console.log("文件不存在");  
    }  
let components = []
let str = 
`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
`
let str2 =''
let str3 = 
`</body>
</html>
<style>
    *{
        background:orange;
    }
    .name{
        font-size: 40px;
        margin-left: 20px;
    }
    img {
        width:300px;
        height:200px;
        margin-left: 20px;
        transition: all 0.6s;
        margin-bottom: 20px;
        border-radius: 10px;
    }
    img:hover {
        transform: scale(1.3);
    }
</style>
`
const files = fs.readdirSync('./images')
files.forEach(function (item, index) {
    let stat = fs.lstatSync("./images/" + item)
    if (stat.isDirectory() === true ) { 
      let info = {
          name:item,
          url:[]
      }
      components.push(info)
    }
})
components.forEach((item,index, arr )=>{
   let items = fs.readdirSync('./images/'+item.name)
   let item3 = []
   items.forEach((item2,index,arr)=>{
    let stat2= fs.lstatSync("./images/" + item.name +'/'+ item2)
        if (stat2.isFile() === true && item2 !=='.DS_Store') { 
            item3.push('./images/'+item.name+'/'+item2)
        }
   })
    item.url = item3;
})

components.forEach((item,index, arr )=>{
    let str6 =
    `<div>
    <div class='name'>${item.name}</div>
    `
    let str8 ='</div>';
    item.url.forEach((item2,index2,arr2)=>{
        let str7 = `<img src="${item2}" alt="${item.name}">`
        str6 += str7;
    })
    str6 += str8
    str2 += str6
 })
let all  = str + str2 + str3;
fs.appendFileSync('./index.html', all)



