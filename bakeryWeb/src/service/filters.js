/**
 * Created by dukuan on 2017/6/13.
 */
export default{
    currency: function (val) {
        return val ? '￥'+val.toFixed(2): '￥0.00';
    }
}
