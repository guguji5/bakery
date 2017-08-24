// 生成8位uid
let type = (name,obj) => console.log(name,Object.prototype.toString.call(obj),obj)
let date= () =>{
    var day = new Date();
    return day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate()+" "+day.getHours()+":"+day.getMinutes()+":"+day.getMinutes();
}
module.exports={
    date:date,
    type:type
};