import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import QuestionForm from '../../components/QuestionForm/QuestionForm';
import { getQuestionById, updateQuestion } from "../../services/questionsService";

function EditQuestion() {
    const navigate=useNavigate();
    const params=useParams();
    const [editQuestion, setEditQuestion] = useState(null);

    useEffect(() => {
        const getQuestion = async () => {
            const id = params.questionId;
            if (id) {
                const { data } = await getQuestionById(id);
                setEditQuestion(data);
            }
        }
        getQuestion();

    }, []);
    const editQuestionHandler =async (newQuestion, id) => {
        const { data } = await updateQuestion(newQuestion, id);
        navigate("/questionsManager");
    }
    return (
        <div>
            <QuestionForm edit={editQuestion} editQuestion={editQuestionHandler} />
        </div>
    )
}

export default EditQuestion