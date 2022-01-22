import Review from "../../../../Model/review";
import fullStar from '../../../../Image/fullstar.png';
import emptyStar from '../../../../Image/emptystar.png';

export default function card(props: Review) {
    let i : number = 0, star: JSX.Element[] = [];

    /************************************************************
     ****** CREATION OF THE STAR OF THE CARD OF THE REVIEW ******
     ************************************************************/
    while(i < 5) {
        star.push(
            i < props.star ?
                <img src={fullStar} alt="Star of the review" className="h-auto w-[25px] inline" key={i} /> :
                <img src={emptyStar} alt="Star of the review" className="h-auto w-[25px] inline" key={i} />
        )
        i++;
    }


    return (
        <div className="my-[20px] w-[100%] bg-[#F5F5F5] rounded-[10px] shadow-[0_6px_15px_rgba(169,169,169,0.6)]">
            <div className="ml-[3%]">
                <h3 className="text-[2.5em]">
                    {props.name}
                </h3>
                <span>
                    {star}
                </span>
            </div>

            <div className="m-[10px]">
                {props.text}
            </div>
        </div>
    );
}