import axios from "axios";
const url = "http://localhost:3001/api/answeredQuestions";

export async function getAllAnsweredQuestions() {
    const data = await axios.get(url);
    return data;
}
export async function getAllAnsweredQuestionsByQuery(query) {
    const data = await axios.get(url+`?${query}`);
    return data;
}
export async function createNewAnsweredQuestion(question) {
    return await axios.post(url, question);
}
export async function getAnsweredQuestionById(id) {
    const data = await axios.get(url + `/${id}`);
    return data;
}
export async function updateAnsweredQuestion(newQuestion, id) {
    const data = await axios.put(url + `/${id}`, newQuestion);
    return data;
}
