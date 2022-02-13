import React from 'react'
import DataTableRow from '../DataTableRow/DataTableRow';
import "./DataTable.css";

function DataTable({ list, colNames }) {
    return (
        <div className='tableContainer'>
            <table>
                <thead>
                    <tr>
                        {colNames.map((colName, index) => {
                            console.log("th");
                            return <th key={index}>{colName.toUpperCase()}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {list.map((obj, index) => {
                        console.log("wow");
                        return <DataTableRow obj={obj} />
                    })}
                </tbody>

            </table>
        </div>
    )
}

export default DataTable