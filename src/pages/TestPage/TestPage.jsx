import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getTestById } from '../../services/testsService';
import "./TestPage.css";
function TestPage() {
  const [test, setTest] = useState();
  const params = useParams();

  useEffect(() => {
    const getTestData = async () => {
      const { data } = await getTestById(params.testId);
      console.log(data);
      setTest(data);
    }
    getTestData();
  }, [])

  return (
    <div>
      {test?.testName}
      {test?.field}
      {test?.testIntroduction}
      {test?.questions.length}
      
      </div>
  )
}

export default TestPage