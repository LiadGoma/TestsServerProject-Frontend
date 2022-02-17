import React from 'react'
import DataTableRow from '../DataTableRow/DataTableRow';
import "./DataTable.css";

function DataTable({ list, colNames , editClick, showClick, deleteClick}) {
    return (
        <div className='tableContainer'>
            <table>
                <thead>
                    <tr>
                        {colNames.map((colName, index) => {
                            return <th key={index}>{colName.toUpperCase()}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {list.map((obj, index2) => {
                        return <DataTableRow key={index2} obj={obj} showClick={showClick} editClick={editClick} deleteClick={deleteClick} />
                    })}
                </tbody>

            </table>
        </div>
    )
}

export default DataTable