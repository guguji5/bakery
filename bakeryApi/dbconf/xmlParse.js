//从xml中解析数据
module.exports=function(node_name,xml){
    var tmp = xml.split("<"+node_name+"><![CDATA[");
    var _tmp = tmp[1].split("]]></"+node_name+">");
    return _tmp[0];
}