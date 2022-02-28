import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "./DataTableRow.css";

function DataTableRow({ obj, editClick, showClick, deleteClick, onSelect, copyLink }) {

    const [selected, setSelected] = useState(false);

    let values = Object.values(obj);
    const id = values[0];
    values = values.filter((value) => value != id);

    useEffect(() => {
        if (obj?.selected) {
            setSelected(obj.selected);
        }
        else{
            setSelected(false);
        }
    }, [obj])

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
        if (onSelect) {
            setSelected((prev) => !prev);
            onSelect(obj);
        }
    }

    return (
        <tr onClick={selectHandler} className={selected ? "selected" : "notSelected"}>
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
                if (value != null) {
                    return <td key={index2}>{value}</td>
                }
            })}
            {editClick != null || showClick != null || deleteClick != null || copyLink === true ? <td>

                <div className='buttonsTable'>
                    {editClick && <button className='editBtn' onClick={clickHandler}>EDIT</button>}
                    {showClick && <button className='editBtn' onClick={showClickHandler}>SHOW</button>}
                    {deleteClick && <button className='editBtn' onClick={deleteClickHandler}>DELETE</button>}
                    {copyLink && <CopyToClipboard text={`http://localhost:3000/test/${obj.id}`}>
                        <button className='editBtn'>COPY LINK</button>
                    </CopyToClipboard>}
                </div>

            </td> : ""}
        </tr>

    )
}

export default DataTableRow