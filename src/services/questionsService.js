import axios from "axios";
const url = "http://localhost:3001/api/questions";

export async function getAllQuestions(user) {
    const data = await axios.get(url);
    return data;
}
