import axios from "axios";
const url = "http://localhost:3001/api/tests";

export async function getAllTests() {
    const data = await axios.get(url);
    return data;
}
export async function createNewTest(test) {
    console.log(test);
    return await axios.post(url, test);
}
export async function getTestById(id) {
    const data = await axios.get(url + `/${id}`);
    return data;
}
export async function updateTest(newTest, id) {
    console.log(newTest)
    const data = await axios.put(url + `/${id}`, newTest);
    return data;
}
