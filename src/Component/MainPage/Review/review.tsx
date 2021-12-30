import { useState, useEffect } from "react";
import { getReview } from "../../../utils/review";
import ReviewModel from '../../../Model/review'
import Card from "./Card/card";
import './review.css'
import Button from '@mui/material/Button';

const obj = {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
}

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
        <div id="review">
            <div className="show-reviews">
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

            <div className="button-wrap">
                <Button variant="contained" size="large" style={obj}>Show all review</Button>

                <Button variant="contained" size="large" style={obj} >Add new review</Button>
            </div>
        </div>
    )
}
