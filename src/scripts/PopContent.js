/**
 * 作者:ling
 * 创建时间:2017/11/1
 * 描述：
 */
import React from "react";

require("../style/pop-content.scss")

const PopContent = (data) =>{
    console.log("--",data);
    let checkData = data.checkData;
    let rightNum = 0;
    if(checkData.length>0){
        rightNum = checkData[checkData.length-1].rightNum;
        console.log("数组最后一个元素",)
    }
    return(
        <div className="pop-content">
            <h1 className="title">结果</h1>
            <div className="content">
                你答对了好友的题目<span style={{"color":"green"}}>{rightNum}</span>题，
                总共<span style={{"fontWeight":"500"}}>{checkData.length}</span>题，
                你的正确率为<span style={{"color":"#2BA245"}}>{(rightNum/checkData.length*100).toFixed(2)}%</span>。
                <a href="">查看详细数据</a>
            </div>
            <span
                className="close"
                onClick={() => {data.store.changeConfig({displayPop:false})} }>
                轻触关闭
            </span>
        </div>
    )
}

export default PopContent;