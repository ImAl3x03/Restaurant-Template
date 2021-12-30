import { useState, useEffect } from "react";
import { getReview } from "../../../utils/review";
import ReviewModel from '../../../Model/review'
import Card from "./Card/card";

import './review.css'

export default function Review() {
    let initialState: ReviewModel[] = [];
    const [reviews, addReview] = useState(initialState);
    let limitReview = 6; //setting limiter to 6

    useEffect(() => {
        async function getAPI() {
            let response = await getReview();
            addReview(response);
        }

        getAPI();
    }, [])

    return (
        <div id="review" className="show-reviews">
            {
                /*sets max of mapping to variable limitReview */
                reviews.map((ele, index) =>
                    index < limitReview &&
                    (<Card
                        id={ele.id}
                        name={ele.name}
                        text={ele.text}
                        star={ele.star}
                        key={ele.id}
                    />)
                )
            }
        </div>
    )
}
