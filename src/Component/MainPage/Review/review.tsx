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

        let reviews = this.state.review;

        if(reviews.length % 2 !== 0) {
            reviews.length -= 1;
        }

        for(let i = 0; i < reviews.length; i += 2) {
            element.push(
                <div className="flex-wrap">
                    <Card name={reviews[i].name} text={reviews[i].text} star={reviews[i].star} id={reviews[i].id} />
                    <Card name={reviews[i + 1].name} text={reviews[i + 1].text} star={reviews[i + 1].star} id={reviews[i + 1].id} />
                </div>
            )
        }

        return (
            <div id="review">
                {element}
            </div>
        );
    }
}