import React,  { Component } from "react";
import { getReview } from "../../../utils/review";
import Review from '../../../Model/review'

interface reviewState {
    review: Review[]
}

export default class review extends Component <{}, reviewState> {
    constructor(prop: any) {
        super(prop);

        this.state = {
            review: []
        }

        this.popiulateState();
    }

    private async popiulateState() {
        let response = await getReview();
        this.state = {
            review: response
        }
    }
    
    render() {
        return(
            <div onClick={() => console.log(this.state)}>
                Test
            </div>
        );
    }
}