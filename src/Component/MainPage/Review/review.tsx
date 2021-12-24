import React, { Component } from "react";
import { getReview } from "../../../utils/review";
import Review from '../../../Model/review'
import Card from "./Card/card";

interface reviewState {
    review: Review[]
}

export default class review extends Component<{}, reviewState> {
    constructor(prop: any) {
        super(prop);

        this.state = {
            review: []
        }
    }

    async componentDidMount() {
        let response = await getReview();

        this.setState({
            review: response
        })
    }

    render() {
        let element: any = [];

        this.state.review.forEach((ele) => {
            element.push(
                <Card name={ele.name} text={ele.text} star={ele.star} id={ele.id} />
            )
        })

        return (
            <div>
                {element}
            </div>
        );
    }
}