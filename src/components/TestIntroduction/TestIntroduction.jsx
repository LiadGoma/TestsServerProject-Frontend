import React from 'react'
import "./TestIntroduction.css"
import HtmlParser from 'react-html-parser'

function TestIntroduction({testIntroduction, onClick}) {
    return (
        <div className="introductionWrapper">
            <div className="introduction">
                {HtmlParser(testIntroduction)}
            </div>
            <button onClick={onClick} className="button">Start The Test!</button>
        </div>
    )
}

export default TestIntroduction
