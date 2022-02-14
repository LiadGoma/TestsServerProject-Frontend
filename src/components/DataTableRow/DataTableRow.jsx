import React from 'react'
import "./DataTableRow.css";
function DataTableRow({ obj, editClick }) {

    let values = Object.values(obj);
    const id = values[0];
    values = values.filter((value) => value != id);

    const clickHandler = () => {
        editClick(id);
    }
    return (
        <tr>
            {values?.map((value, index2) => {
                return <td key={index2}>{value}</td>
            })}
            <td>
                <button className='editBtn' onClick={clickHandler}>EDIT</button>
            </td>
        </tr>

    )
}

export default DataTableRow