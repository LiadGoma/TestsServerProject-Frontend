import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TestForm from '../../components/TestForm/TestForm';
import { getTestById, updateTest } from '../../services/testsService';
import "./EditTest.css";

function EditTest() {
    const [editTest, setEditTest] = useState(null);
    const navigate=useNavigate();
    const params = useParams();

    useEffect(() => {
        const getTest = async () => {
            const id = params.testId;
            if (id) {
                const { data } = await getTestById(id);
                console.log(data);
                setEditTest(data);
            }
        }
        getTest();

    }, []);
    const editTestHandler =async (newTest, id) => {
        const { data } = await updateTest(newTest, id);
        navigate("/questionsManager");
    }
    return (
        <div>
            <TestForm edit={editTest} editTest={editTestHandler}/>
        </div>
    )
}

export default EditTest