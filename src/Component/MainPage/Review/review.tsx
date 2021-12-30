import { useState, useEffect } from "react";
import { getReview } from "../../../utils/review";
import ReviewModel from '../../../Model/review'
import Card from "./Card/card";

import './review.css'

export default function Review() {
    let initialState: ReviewModel[] = [];
    const [reviews, addReview] = useState(initialState);

    useEffect(() => {
        async function getAPI() {
            let response = await getReview();
            addReview(response);
        }

        getAPI();
    }, [])

    return (
        <div className="show-reviews">
            {
                reviews.map((ele) =>
                    <Card id={ele.id} name={ele.name} text={ele.text} star={ele.star} key={ele.id} />
                )
            }
        </div>
    )
}
