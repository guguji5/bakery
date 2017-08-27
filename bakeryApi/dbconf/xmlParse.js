//从xml中解析数据
module.exports=function(node_name,xml){
    if(xml){
        var tmp = xml.split("<"+node_name+"><![CDATA[");
        if(tmp.length>1){
            var _tmp = tmp[1].split("]]></"+node_name+">");
            return _tmp[0];
        }else{
            return ''
        }
    }else{
        return '';
    }


}