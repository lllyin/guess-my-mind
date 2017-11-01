/**
 * 作者:ling
 * 创建时间:2017/9/28
 * 描述：
 */
import React from "react";
import ReactDOM from "react-dom";
import { observable, useStrict, action } from 'mobx';
import { observer } from 'mobx-react';
useStrict(true);

import QuestionForm from "./scripts/QuestionForm";
import PopModel from "./scripts/PopModel";

class MyState{
    @observable checkData = [];
    @observable config = {
        "displayPop":false
    }


    @action changeCheckData = (checkData) => {
        console.log("changeCheckData is run again",checkData)
        this.checkData = checkData;
    }

    @action changeConfig = (config) => {
        console.log("changeConfig is run again",config)
        this.config = Object.assign({},this.config,config)
    }
}

const newState = new MyState();
console.log("newState对象：",newState)

@observer
class App extends React.Component{
    render(){
        return(
            <div className="container">
                <QuestionForm store={newState}/>
                <PopModel store={newState}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#container")
)