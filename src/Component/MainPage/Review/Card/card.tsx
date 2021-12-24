import Review from "../../../../Model/review";

import './card.css';

import fullStar from '../../../../Image/fullstar.png';
import emptyStar from '../../../../Image/emptystar.png';

export default function card(props: Review) {
    let i = 0;
    let star = [];

    for (i = 0; i < props.star; i++) {
        star.push(<img src={fullStar} alt="Star of the review" className="star-img" />)
    }

    while (i < 5) {
        star.push(<img src={emptyStar} alt="Star of the review" className="star-img" />)
        i++;
    }


    return (
        <div className="card">
            <div className="card-header">
                <h3>
                    {props.name}
                </h3>
                <span>
                    {star}
                </span>
            </div>

            <p>
                {props.text}
            </p>
        </div>
    );
}