import axios from "axios";
const url = "http://localhost:3001/api/respondents";

export async function getAllRespondents() {
    const data = await axios.get(url);
    return data;
}
export async function createNewRespondent(respondent) {
    return await axios.post(url, respondent);
}
export async function getRespondnetById(id) {
    const data = await axios.get(url + `/${id}`);
    return data;
}
