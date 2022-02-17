import React, { useState } from 'react'
import TestForm from '../../components/TestForm/TestForm';
import { getTestById, updateTest } from '../../services/testsService';
import "./EditTest.css";
function EditTest() {
    const [editTest, setEditTest] = useState(null);

    useEffect(() => {
        const getTest = async () => {
            const id = localStorage.getItem("editTest");
            localStorage.clear();
            if (id) {
                const { data } = await getTestById(id);
                setEditTest(data);
            }
        }
        getTest();

    }, []);
    const editTestHandler =async (newTest, id) => {
        const { data } = await updateTest(newTest, id);
        window.location="/questionsManager";
    }
    return (
        <div>
            <TestForm edit={editTest} editTest={editTestHandler}/>
        </div>
    )
}

export default EditTest