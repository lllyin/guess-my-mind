/**
 * 作者:ling
 * 创建时间:2017/9/28
 * 描述：问题表单
 */

import React from "react";
import toast from "./_toast";
import { observable, useStrict, action } from 'mobx';
import { observer } from 'mobx-react';
useStrict(true);

require("../style/quesition_form.scss");
require("../style/toast.scss");

let questionData = require("./questions.json");  //问题表单数据
let answerData = require("./answer.json");  //问题答案数据

@observer
class QuestionForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            originQuestions:questionData,
            answerData:answerData,
            useQuestions:[questionData[0]],
            markIdx:0,
            flag:true
        };
        this.selectOptions = this.selectOptions.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    //选择答案
    selectOptions(key,val,questionId){  //参数：问题key,问题内容，问题ID
        let markIdx = this.state.markIdx;   //记录当前题目序号

        //最后一题，答题结束
        if(markIdx === this.state.originQuestions.length-1){
            if(this.state.flag){
                this.replyQuestion(questionId,key,"你选择的是"+ (key+10).toString(36).toUpperCase() + "：" +val);

                //验证回答
                let checkData = this.checkAnswer(this.state.useQuestions,answerData);
                console.log("您答对了"+checkData.rightNum +"题","总共"+checkData.length+"题","正确率："+(checkData.rightNum/checkData.length)*100+"%")
                this.props.store.changeCheckData(checkData);

                //调起答案结果弹窗
                this.props.store.changeConfig({displayPop:true})
            }
            toast("答题完毕。");
            this.setState({flag:false})
            return;
        }

        //答题尚未结束
        if(markIdx < questionId ){
            //回复消息
            this.replyQuestion(questionId,key,"你选择的是"+ (key+10).toString(36).toUpperCase() + "：" +val)
            //添加下一题
            setTimeout(()=>this.nextQuestion(questionId),500)
            this.setState((prevState) => ({markIdx:prevState.markIdx+1}));
        }
    }

    //下一题
    nextQuestion(questionIdx){
        let nextQuestionData = this.state.originQuestions[questionIdx];
        let prevQuestionArr = this.state.useQuestions;
        prevQuestionArr.push(nextQuestionData)
        this.setState({"useQuestions": prevQuestionArr});
    }

    //回复题目
    replyQuestion(id,key,content){
        let replydata = {};
        replydata.type = "REPLY";
        replydata.id = id;
        replydata.content = {
            answerKey:key,
             message: content
        }
        // console.log("回复：",replydata);
        let prevQuestionArr = this.state.useQuestions;
        prevQuestionArr.push(replydata)
        this.setState({"useQuestions": prevQuestionArr});
    }

    //验证回答是否正确
    checkAnswer(questionData,answerData){   //答卷，答案
        // console.log(questionData,answerData);
        let checkData = [];         //用保存验证后的结果数据。元素结构：{id:问题id，answerKey1：回答者题目编号，answerKey2：正确题目编号，status:是否正确}
        let rightNum = 0;           //答对题目数量
        let errorNum = 0;           //答错题目数量
        questionData.map((questionData) => {
                let checkTemp = {};
                if(questionData.type === "REPLY"){
                    answerData.forEach((val,key)=>{
                        if(questionData.id === val.id){
                            checkTemp.id = questionData.id;
                            checkTemp.answerKey1 = questionData.content.answerKey;
                            checkTemp.answerKey2 = val.answerKey;
                            if(questionData.content.answerKey === val.answerKey){
                                checkTemp.status = true;
                                rightNum++;
                            }else{
                                checkTemp.status = false;
                                errorNum++;
                            }
                        }
                    })
                    checkData.push(checkTemp)
                }
            }
        )
        let count = {//统计
            rightNum:rightNum,  //答对题目
            errorNum:errorNum   //打错题目
        }
        checkData.push(count);
        return checkData;
    }

    componentDidUpdate(){
        //组件被冲洗渲染后，将页面拉到最底部
        let bodyHeight = document.body.clientHeight;    //页面高度
        window.document.documentElement.scrollTop = bodyHeight;     //chrome
        window.pageYOffset = bodyHeight;                            //firefox
        document.body.scrollTop = bodyHeight;                       //safari
    }

    componentDidMount(){
        // toast("抽奖环节还在开发中,请稍后...")
    }

    render(){
        console.log("questionForm:",this.props.store)
        let _this = this;
        let useQuestions = this.state.useQuestions; //当前启用问题数据
        let QustionFormList = [];   //问题表单
        useQuestions.forEach(function (val,key) {
            if(val.type === "QUESTION"){    //如果类型是问题
                let direction = "left";     //问题方向：靠左
                let questionId = val.id;  //问题ID
                let QustionOptionsList = [];    //问题对应答案
                val.content.answer.forEach((val,key) => {
                    QustionOptionsList.push(
                        <li key={key} onClick={_this.selectOptions.bind(_this,key,val,questionId)}>
                            {(key+10).toString(36).toUpperCase()}：{val}
                        </li>
                    )
                })
                QustionFormList.push(
                    <div className={"question-form " + direction} key={key}>
                        <div className="question-info">
                            <img src={require("../media/" + "wx_logo.png")} />
                            <h2 className="question-title">
                                {questionId}、
                                {val.content.question}
                            </h2>
                        </div>
                        <ul className="question-options">
                            {QustionOptionsList}
                        </ul>
                    </div>
                )
            }else if(val.type === "REPLY"){     //如果类型是回复
                let direction = "right";     //问题方向：靠右
                QustionFormList.push(
                    <div className={"question-form " + direction} key={key}>
                        <div className="question-info">
                            <img src={require("../media/" + "avatar.jpg")} />
                            <h2 className="question-title">{val.content.message}</h2>
                        </div>
                    </div>
                )
            }
        })

        return(
            <section>
                {QustionFormList}
            </section>
        )
    }
}


export default QuestionForm;