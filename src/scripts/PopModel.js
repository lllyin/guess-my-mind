/**
 * 作者:ling
 * 创建时间:2017/11/1
 * 描述：弹窗框架
 */

import React from "react";
import PopContent from "./PopContent";
import { observable, useStrict, action } from 'mobx';
import { observer } from 'mobx-react';
useStrict(true);

require("../style/pop-model.scss")

@observer
class PopModel extends React.Component{

    render(){
        let configData = this.props.store.config;       //是否显示弹窗的配置文件
        let checkData = this.props.store.checkData

        console.log("PopModel:",this.props.store.checkData.length)
        return(
            <section className={configData.displayPop?"show pop-model-wrap":"hide pop-model-wrap"}>
                <div className="pop-model"></div>
                <PopContent checkData={checkData} store={this.props.store} />
            </section>
        )
    }

}

export default PopModel;