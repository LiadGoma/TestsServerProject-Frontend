import axios from "axios";
const url = "http://localhost:3001/api/answeredTests";

export async function getAllAnsweredTests() {
    const data = await axios.get(url);
    return data;
}
export async function getAllAnsweredTestsByQuery(query) {
    const data = await axios.get(url+`?${query}`);
    return data;
}
export async function createNewAnsweredTest(test) {
    return await axios.post(url, test);
}
export async function getAnsweredTestById(id) {
    const data = await axios.get(url + `/${id}`);
    return data;
}
export async function updateAnsweredTest(newTest, id) {
    const data = await axios.put(url + `/${id}`, newTest);
    return data;
}

