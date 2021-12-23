import axios from "axios";
import Review from "../Model/review";

const URL: string = "https://localhost:44369/api/Review";

export async function getReview(): Promise<Review[]> {
    try {
        let response = (await axios.get(URL)).data;
        //console.log(response);
        return response;
    } catch {
        return [
            {
                id: "",
                name: "",
                text: "",
                star: 0
            }
        ]
    }
}