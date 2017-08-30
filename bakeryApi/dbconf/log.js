// 生成8位uid
let type = (name,obj) => console.log(name,Object.prototype.toString.call(obj),obj)
let date= () =>{
    // var day = new Date();
    // return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate()+" "+day.getHours()+":"+day.getMinutes()+":"+day.getMinutes();
    var day = new Date();
    var h = day.getHours()>9?day.getHours():("0"+day.getHours());
    var m = day.getMinutes()>9?day.getMinutes():("0"+day.getMinutes());
    var s = day.getSeconds()>9?day.getSeconds():("0"+day.getSeconds());
    return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate()+" "+h+":"+m+":"+s;
}
module.exports={
    date:date,
    type:type
};