import React from 'react'
import "./DataTableRow.css";
function DataTableRow({ obj, editClick, showClick, deleteClick }) {

    let values = Object.values(obj);
    const id = values[0];
    values = values.filter((value) => value != id);

    const clickHandler = () => {
        editClick(id);
    }
    const showClickHandler=()=>{
        showClick(id);
    }
    const deleteClickHandler = ()=>{
        deleteClick(id);
    }
    return (
        <tr>
            {values?.map((value, index2) => {
                if (Array.isArray(value)) {
                    return <td key={index2}>
                        <div>{value[0]}</div>
                        <div className='tagsRow'>
                            {value.map((tag, index) => {
                                if (index > 0 &&index <value.length-1){
                                    return <div key={index}>{`${tag} |`}</div>
                                }
                                if(index===value.length-1){
                                    return <div key={index}>{tag}</div>
                                }
                            })}
                        </div>
                    </td>
                }
                return <td key={index2}>{value}</td>
            })}
            <td>
                <div className='buttonsTable'>
                <button className='editBtn' onClick={clickHandler}>EDIT</button>
                <button className='editBtn' onClick={showClickHandler}>SHOW</button>
                <button className='editBtn' onClick={deleteClickHandler}>DELETE</button>
                </div>
           
            </td>
        </tr>

    )
}

export default DataTableRow