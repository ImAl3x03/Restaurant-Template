import React, { useState } from "react";
import ReviewModel from '../../../Model/review'

import { Dialog, DialogContent, DialogTitle, MenuItem } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import './AddReview.css'

interface Props {
  open: boolean,
  onClose: () => void,
  className?: string,

}

export default function AddReview(props: Props) {
  const [review, setReview] = useState<string>("");
  const [reviewStars, setReviewStars] = useState("5");
  const [enteredName, setEnteredName] = useState<string>("")
  const rating = [
    {
      value: "5",
      label: "⭐⭐⭐⭐⭐"
    },
    {
      value: "4",
      label: "⭐⭐⭐⭐"
    },
    {
      value: "3",
      label: "⭐⭐⭐"
    },
    {
      value: "2",
      label: "⭐⭐"
    },
    {
      value: "1",
      label: "⭐"
    }
  ]

  const reviewHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value)
  }
  const enteredNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredName(event.target.value)
  };

  const reviewStarsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewStars(event.target.value)
  }

  return (
    <Dialog open={props.open} className="add-review">
      <DialogTitle className="dialogue-title">
        <p>please add your review</p> <CloseIcon onClick={props.onClose} />
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          sx={{ /* settign the css of the TextFields*/
            '& .MuiTextField-root': { m: 1, width: '25' },
          }}>
          <div>
            <TextField
              variant="standard"
              id='user-entered-name'
              required
              label="Your Name"
              value={enteredName}
              onChange={enteredNameHandler}
            />
            <TextField
              id="rating-dropbar"
              variant="standard"
              select
              label="Select rating"
              value={reviewStars}
              onChange={reviewStarsHandler}
            >
              {//mapping the rating options
              rating.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

            {/* maxRows: sets limit of visible rows before scroll */}
            <TextField
              id="review_entered"
              variant="standard"
              label="Review"
              multiline
              maxRows={7} 
              required
              value={review}
              onChange={reviewHandler}
              fullWidth
            />


        </Box>
      </DialogContent>
    </Dialog>
  )
}