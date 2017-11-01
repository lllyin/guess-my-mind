/**
 * 作者:ling
 * 创建时间:2017/10/10
 * 描述：
 */

let toast = function(msg) {
    // alert("我是toast"+msg);
    var oToast = document.createElement("div");
    oToast.innerHTML = msg;
    oToast.setAttribute("class","ly-toast show")
    document.body.appendChild(oToast)
    // console.log(oToast)
}

export default toast;