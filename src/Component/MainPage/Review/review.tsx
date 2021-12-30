import { useState, useEffect } from "react";
import { getReview } from "../../../utils/review";
import ReviewModel from '../../../Model/review'
import Card from "./Card/card";
import './review.css'
import Button from '@mui/material/Button';
import { Dialog, DialogContent } from "@mui/material";
import { makeStyles } from "@mui/styles";

const buttonStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
}

const useStyles = makeStyles({
    container: {
        height: "auto"
    }
})

export default function Review() {
    let initialState: ReviewModel[] = [];
    const [reviews, addReview] = useState(initialState);
    let limitReview = 6; //setting limiter to 6

    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

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
                <Button variant="contained" size="large" style={buttonStyle} onClick={handleClickOpen}>Show all review</Button>

                <Button variant="contained" size="large" style={buttonStyle} >Add new review</Button>
            </div>

            <Dialog open={open} onClose={handleClose} className={classes.container} fullWidth={true} maxWidth={"lg"}>
                <DialogContent>
                    <div className="show-reviews dialog-container">
                        {
                            reviews.map((ele) =>
                                <Card
                                    id={ele.id}
                                    name={ele.name}
                                    text={ele.text}
                                    star={ele.star}
                                    key={ele.id}
                                />
                            )
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
