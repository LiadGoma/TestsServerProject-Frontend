import React, { useEffect, useState } from 'react'
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import { getQuestionById, updateQuestion } from "../../services/questionsService";

function EditQuestion() {
    const [editQuestion, setEditQuestion] = useState(null);

    useEffect(() => {
        const getQuestion = async () => {
            const id = localStorage.getItem("editQuestion");
            localStorage.clear();
            if (id) {
                const { data } = await getQuestionById(id);
                setEditQuestion(data);
            }
        }
        getQuestion();

    }, []);
    const editQuestionHandler =async (newQuestion, id) => {
        const { data } = await updateQuestion(newQuestion, id);
        window.location="/questionsManager";
    }
    return (
        <div>
            <QuestionForm edit={editQuestion} editQuestion={editQuestionHandler} />
        </div>
    )
}

export default EditQuestion