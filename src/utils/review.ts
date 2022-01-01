import axios from "axios";
import Review from "../Model/review";

const URL: string = "https://localhost:44369/api/Review";

export async function getReview(): Promise<Review[]> {
    try {
        let response = (await axios.get(URL)).data;
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

export async function postReview(data: Review) {
    await axios.post(URL, data);
}