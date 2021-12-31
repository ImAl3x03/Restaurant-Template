import { useEffect, useState } from "react";
import axios from 'axios'

import { Button } from "@mui/material";

interface Props {
  name: string,
  stars: string,
  review: string,
  children: any,
  open: boolean,
  onClose: (arg0: boolean) => void
}

export default function AddReviewCheck(props: Props) {
  const [nameIsValid, setNameIsValid] = useState(false)
  const [reviewIsValid, setReviewIsValid] = useState(false)

  //minor problem: useEffect runs on every keystroke
  //which is not optimal
  useEffect(() => {
    if (props.name.trim().length !== 0) {
      setNameIsValid(true)
    }
    if (props.review.split(' ').length >= 5) {
      setReviewIsValid(true)
    }
    console.log("useeffect triggered")
  }, [props.name, props.review])

  const checkValidity = () => {
    if (nameIsValid && reviewIsValid) {
      //To let the user know it has been submitted
      alert("Review Submitted! \nThanks for your time!")

      axios.post('https://localhost:44369/api/Review',
        {//JSON file expected for the
          "name": props.name,
          "text": props.review,
          "star": parseInt(props.stars)

        })
        //testing purposes ONLY
        .then((response)=>{
          console.log(response)
        })
        .catch((err)=>{
          //can be changed in the future to let user know something went wrong
          console.error("Error: ", err)
        })

      props.onClose(!props.open)
    }
  }


  return (
    <Button onClick={checkValidity}>
      {props.children}
    </Button>
  )

}