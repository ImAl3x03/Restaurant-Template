import Review from "../../../../Model/review";

export default function card(props: Review) {
    return (
        <div className="card">
            <h3>
                {props.name}
            </h3>
            <p>
                {props.text}
            </p>
            <p>
                {props.star}
            </p>
        </div>
    );
}