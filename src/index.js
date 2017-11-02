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
import ResultAnalysis from "./scripts/ResultAnalysis";

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
class Main extends React.Component{
    render(){
        return(
            <div className="container">
                <QuestionForm store={newState}/>
                <PopModel store={newState}/>
            </div>
        )
    }
}


class App extends React.Component{
    constructor(props){
        super(props);
        this.state = { route: window.location.hash.substr(1)}
    }

    componentDidMount(){
        window.addEventListener("hashchange",()=>{
            this.setState({route: window.location.hash.substr(1)})
        })
    }

    render(){
        let Conent = []; //组件内容
        switch (this.state.route){
            case "/result":
                Conent.push(<ResultAnalysis key={1} store={newState} />);
                break;
            default:
                Conent.push(<Main key={1} />);
        }
        return(
            <div>
                {Conent}
            </div>
        )
    }

}




ReactDOM.render(
    <App/>,
    document.querySelector("#container")
)