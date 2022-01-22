import {useState, useEffect, useReducer, useCallback} from "react";
import axios from 'axios';
import {Dialog, DialogTitle, DialogContent, Button, Box, TextField, Snackbar, Alert, MenuItem} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {makeStyles} from "@mui/styles";
import Card from "./Card/Card";
import ReviewModel from '../../../Model/review';
import css from './Review.module.css';

/**************************************************************
 ****** STYLE OF THE BUTTON AT THE END OF REVIEW SECTION ******
 **************************************************************/
const buttonStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
}

/********************************
 ****** STYLE OF THE POPUP ******
 ********************************/
const dialogStyle = makeStyles({
    container: {
        height: "auto"
    }
})

/**************************************************
 ****** STYLE OF THE ICON TO CLOSE THE POPUP ******
 **************************************************/
const iconStyle = makeStyles({
    root: {
        float: "right",
        marginRight: "20px",
        cursor: "pointer"
    }
})

// Rating of the review used in the select input element
const rating = [
    {value: "5", label: "⭐⭐⭐⭐⭐"},
    {value: "4", label: "⭐⭐⭐⭐"},
    {value: "3", label: "⭐⭐⭐"},
    {value: "2", label: "⭐⭐"},
    {value: "1", label: "⭐"}
]

/*************************************************
 ****** MODEL OF THE STATE OF THE COMPONENT ******
 *************************************************/
interface ReviewState {
    review: ReviewModel[];
    reviewText: string;
    star: string;
    name: string;
}

//Initial state
const initialState: ReviewState = {
    review: [],
    reviewText: "",
    star: "5",
    name: ""
}

/*****************************************
 ****** ACTION TO USE ON useReducer ******
 *****************************************/
enum ActionKind {
    SETREVIEW = "SETREVIEW",
    SETREVIEWTEXT = "SETREVIEWTEXT",
    SETSTAR = "SETSTAR",
    SETNAME = "SETNAME"
}

/********************************************
 ****** ACTION AND DATA FOR useReducer ******
 ********************************************/
interface Action {
    type: ActionKind,
    payload: string | ReviewModel[]
}

/*********************************************
 ****** REDUCER FUNCTION FOR useReducer ******
 *********************************************/
function reducer(state: ReviewState, action: Action): ReviewState {
    let {type, payload} = action;

    switch (type) {
        case ActionKind.SETREVIEW:
            payload = payload as ReviewModel[];

            return {
                ...state,
                review: [...payload, ...state.review]
            }

        case ActionKind.SETREVIEWTEXT:
            return {
                ...state,
                reviewText: payload.toString()
            }

        case ActionKind.SETSTAR:
            return {
                ...state,
                star: payload.toString()
            }
        case ActionKind.SETNAME:
            return {
                ...state,
                name: payload.toString()
            }
        default:
            return state;
    }
}

let limitReview = 6; //Setting limiter of render for the reviews
const URL: string = "https://localhost:44369/api/Review";

export default function Review() {
    //useState fot the state of the popup to open all review
    const [isOpenAllReview, setIsOpenAllReview] = useState<boolean>(false);

    //useState fot the state of the popup to add review
    const [isOpenAddReview, setIsOpenAddReview] = useState<boolean>(false);

    //useState for the state of the alert on review insert
    const [isAlert, setIsAlert] = useState<boolean>(false);

    /************************************
     ****** STATE OF THE COMPONENT ******
     ************************************/
    const [state, dispatch] = useReducer(reducer, initialState);

    //Creation of the style of MUI
    const dialogClasses = dialogStyle();
    const iconClasses = iconStyle();

    /**********************************************************
     ****** USE EFFECT FOR CALLING THE API OF THE REVIEW ******
     **********************************************************/
    useEffect(() => {
        axios.get<ReviewModel[]>(URL)
            .then((response) => {
                dispatch({
                    type: ActionKind.SETREVIEW,
                    payload: response.data
                });
            })
    }, [])

    /****************************************************
     ****** FUNCTION TO CLOSE ALL THE REVIEW POPUP ******
     ****************************************************/
    const handleCloseAllReview = useCallback(() => {
        setIsOpenAllReview(false);
    }, [])

    /************************************************
     ****** FUNCTION TO CLOSE ADD REVIEW POPUP ******
     ************************************************/
    const handleCloseAddReview = useCallback(() => {
        setIsOpenAddReview(false);
    }, [])

    return (
        <div id="review" className="mt-[2cm]">
            <h2 className="text-center text-[2.5em] md:text-[4em]">Reviews</h2>
            <div className={css.showReviews}>
                {
                    // Sets max of mapping to variable limitReview
                    state.review.map((ele, index) =>
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

            <div className={css.bWrap + " block md:flex md:justify-around"}>
                <Button variant="contained" size="large" style={buttonStyle} onClick={() => setIsOpenAllReview(true)}>Show
                    all review</Button>

                <Button variant="contained" size="large" style={buttonStyle} onClick={() => setIsOpenAddReview(true)}>Add
                    new review</Button>
            </div>

            <Dialog
                open={isOpenAllReview}
                onClose={handleCloseAllReview}
                className={dialogClasses.container}
                fullWidth={true}
                maxWidth="lg"
            >
                <DialogTitle>
                    <CloseIcon className={iconClasses.root} onClick={handleCloseAllReview}/>
                </DialogTitle>
                <DialogContent>
                    <div className={css.showReviews}>
                        {
                            state.review.map((ele) =>
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

            <Dialog open={isOpenAddReview}>
                <DialogTitle className="dialogue-title">
                    <p>Please Add your Review</p>
                    <CloseIcon onClick={handleCloseAddReview} className={iconClasses.root}/>
                </DialogTitle>

                <DialogContent>
                    <Box component="form" sx={{'& .MuiTextField-root': {m: 1, width: '60'},}}>
                        <div>
                            <TextField
                                variant="standard"
                                id='user-entered-name'
                                required
                                label="Your Name"
                                value={state.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    dispatch({
                                        type: ActionKind.SETNAME,
                                        payload: e.target.value
                                    })
                                }}
                            />
                            <TextField
                                sx={{
                                    width: "200",
                                }}
                                id="rating-dropbar"
                                variant="standard"
                                select
                                label="Select rating"
                                value={state.star}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    dispatch({
                                        type: ActionKind.SETSTAR,
                                        payload: e.target.value
                                    })
                                }}
                            >
                                {
                                    //mapping the rating options
                                    rating.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </div>

                        <TextField
                            id="review_entered"
                            variant="standard"
                            label="Review"
                            multiline
                            maxRows={7}
                            required
                            value={state.reviewText}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch({
                                    type: ActionKind.SETREVIEWTEXT,
                                    payload: e.target.value
                                })
                            }}
                            fullWidth
                        />

                        <Button onClick={() => {
                            if(state.name.trim().length !==  0 && state.reviewText.trim().length !== 0) {
                                let newReview : ReviewModel = {
                                    id: "",
                                    name: state.name,
                                    text: state.reviewText,
                                    star: parseInt(state.star)
                                }

                                dispatch({
                                    type: ActionKind.SETREVIEW,
                                    payload: [newReview]
                                });

                                axios.post(URL, newReview);

                                setIsOpenAddReview(false);
                                setIsAlert(true);
                            }
                        }}>
                            Submit review
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <Snackbar open={isAlert} autoHideDuration={3000} onClose={() => setIsAlert(false)}
                      anchorOrigin={{vertical: "top", horizontal: "right"}}>
                <Alert severity="success" onClose={() => setIsAlert(false)} sx={{width: "100%"}}>
                    Review added
                </Alert>
            </Snackbar>
        </div>
    )
}
