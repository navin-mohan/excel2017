import React, { Component } from "react";
import Ringer from "../helpers/countdown-rings";

export default class CountDownRinger extends Component{
    constructor(props){
        super(props);
        this.state = {
            test: false
        };
        this.ringer = new Ringer({
            countdown_to: this.props.options.endDate,
            firstCircleStrokeStyle: this.props.options.topCircleColor,
            secondCircleStrokeStyle: this.props.options.bottomCircleColor,
            textFillStyle: this.props.options.textColor
        });
    }

    init(cvs){
        console.log("init",cvs);
        this.ringer.init(cvs);
        this.interval = setInterval(() => {
            // this.setState({test: !this.state.test});
            this.ringer.go();
            console.log(this.state);
        },1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render(){
        return (
            <div>
                <canvas ref={(e) => {this.init.bind(this,e)();console.log("canvas");}} ></canvas>
            </div>
        );
    }

}