import React, { useState } from 'react';
import "./DataTableRow.css";
function DataTableRow({ obj, editClick, showClick, deleteClick, onSelect }) {

    const [selected, setSelected] = useState(false);

    let values = Object.values(obj);
    const id = values[0];
    values = values.filter((value) => value != id);

    const clickHandler = () => {
        editClick(id);
    }
    const showClickHandler = () => {
        showClick(id);
    }
    const deleteClickHandler = () => {
        deleteClick(id);
    }
    const selectHandler = () => {
        if(onSelect){
            setSelected(!selected);
            onSelect(obj);
        }
    }
   
    return (
        <tr onClick={selectHandler} className={selected?"selected":""}>
            {values?.map((value, index2) => {
                if (Array.isArray(value)) {
                    return <td key={index2}>
                        <div>{value[0]}</div>
                        <div className='tagsRow'>
                            {value.map((tag, index) => {
                                if (index > 0 && index < value.length - 1) {
                                    return <div key={index}>{`${tag} |`}</div>
                                }
                                if (index === value.length - 1) {
                                    return <div key={index}>{tag}</div>
                                }
                            })}
                        </div>
                    </td>
                }
                return <td key={index2}>{value}</td>
            })}
            { editClick||showClick||deleteClick &&<td>
                <div className='buttonsTable'>
                    {editClick && <button className='editBtn' onClick={clickHandler}>EDIT</button>}
                    {showClick && <button className='editBtn' onClick={showClickHandler}>SHOW</button>}
                    {deleteClick && <button className='editBtn' onClick={deleteClickHandler}>DELETE</button>}
                </div>

            </td>}
        </tr>

    )
}

export default DataTableRow