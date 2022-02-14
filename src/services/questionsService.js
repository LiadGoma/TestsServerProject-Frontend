import axios from "axios";
const url = "http://localhost:3001/api/questions";

export async function getAllQuestions() {
    const data = await axios.get(url);
    return data;
}
export async function createNewQuestion(question) {
    return await axios.post(url, question);
}
export async function getQuestionById(id) {
    const data = await axios.get(url+`/${id}`);
    return data;
}
