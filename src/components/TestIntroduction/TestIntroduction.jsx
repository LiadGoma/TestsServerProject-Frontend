import React from 'react'
import "./TestIntroduction.css"

function TestIntroduction({testIntroduction, onClick}) {
    return (
        <div className="introductionWrapper">
            <div className="introduction">
                {testIntroduction}
            </div>
            <button onClick={onClick} className="button">Start The Test!</button>
        </div>
    )
}

export default TestIntroduction
