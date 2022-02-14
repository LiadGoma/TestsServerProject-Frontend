import React, { useEffect, useState } from 'react'
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import { getQuestionById } from "../../services/questionsService";

function EditQuestion() {
    const [editQuestion, setEditQuestion] = useState(null);
    
    useEffect(() => {
        const getQuestion = async () => {
            const id = localStorage.getItem("editQuestion");

            localStorage.clear();
            if (id) {
                const { data } = await getQuestionById(id);
                console.log(data);
                setEditQuestion(null);
                setEditQuestion(data);
            }
        }
        getQuestion();

    }, []);
    return (
        <div>
            <QuestionForm edit={editQuestion} />
        </div>
    )
}

export default EditQuestion