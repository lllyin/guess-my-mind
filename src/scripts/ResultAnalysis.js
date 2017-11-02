/**
 * 作者:ling
 * 创建时间:2017/11/2
 * 描述：
 */

import React from "react";

require("../style/result-analysis.scss")

class ResultAnalysis extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.resultWrap.style.minHeight = window.outerHeight+"px";
    }


    render(){
        console.log("分析结果",this.props.store.checkData);
        let checkData = this.props.store.checkData;
        let AnswerList = [];    //正确答案
        let ReplyList = [];     //回答
        let rightNum = 0;
        if(checkData.length>0){
            rightNum = checkData[checkData.length-1].rightNum;
            let myCheckData = checkData;
            myCheckData.pop();
            myCheckData.forEach((val,key)=>{
                let isRight = true; //答题是否正确
                if(!val.status){
                    isRight = false;
                }
                AnswerList.push(
                    <li key={key}>
                        {val.id}、
                        {(val.answerKey2+10).toString(36).toUpperCase()}
                    </li>
                )
                ReplyList.push(
                    <li key={key} className={isRight?"right":"error"}>
                        {val.id}、
                        {(val.answerKey1+10).toString(36).toUpperCase()}
                    </li>
                )
            })
            console.log(123)
        }
        return(
            <div className="result-wrap" ref={(resultWrap) => (this.resultWrap = resultWrap)}>
                <h1 className="title">详细数据</h1>
                <p className="content">
                    你答对了好友的题目<span style={{"color":"green"}}>{rightNum}</span>题，
                    总共<span style={{"fontWeight":"500"}}>{checkData.length}</span>题，
                    你的正确率为<span style={{"color":"#2BA245"}}>{(rightNum/checkData.length*100).toFixed(2)}%</span>。
                    {/*<Link to="/result">查看详细数据</Link>*/}
                </p>
                <div className="analysis-wrap">
                    <div className="answer-box analysis-box">
                        <div className="analysis-box-header">好友答案</div>
                        {AnswerList}
                    </div>
                    <div className="reply-box analysis-box">
                        <div className="analysis-box-header">你选择的是</div>
                        {ReplyList}
                    </div>
                </div>
                <div className="tips">
                    <p className="right-example example"><span></span>正确</p>
                    <p className="error-example example"><span></span>错误</p>
                </div>
            </div>
        )
    }
}


export default ResultAnalysis;