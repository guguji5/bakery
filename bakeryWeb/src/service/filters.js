/**
 * Created by dukuan on 2017/6/13.
 */
export default{
    currency: function (val) {
        return val ? '￥'+val.toFixed(2): '￥0.00';
    },
    time:function (val) {
        //因为这里存的不是毫秒而是秒
        var day = new Date(1000*val);
        return day.getFullYear() + "/" + (day.getMonth() + 1) + "/" + day.getDate();
    }
}
