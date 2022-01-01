import { useEffect, useState } from "react";
import { postReview } from '../../../utils/review'
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
      postReview({
        id: "",
        name: props.name,
        text: props.review,
        star: parseInt(props.stars)
      });

      //To let the user know it has been submitted
      alert("Review Submitted! \nThanks for your time!")

      props.onClose(!props.open)
    }
  }


  return (
    <Button onClick={checkValidity}>
      {props.children}
    </Button>
  )

}