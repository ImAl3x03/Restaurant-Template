import axios from "axios";
import Menu from "../Model/menu";

const URL: string = "https://localhost:44369/api/Menu";

export async function getMenu() : Promise<{[category: string]: Menu[]}> {
    try {
        let result : {[category: string]: Menu[]} = await (await axios.get(URL)).data;
        console.log(result);
        return result;
    } catch {
        return {"": []}
    }
}