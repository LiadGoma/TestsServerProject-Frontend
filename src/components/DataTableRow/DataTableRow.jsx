import React from 'react'

function DataTableRow({ obj }) {

    const values = Object.values(obj);
    console.log(values);
    return (
        <tr>
            {values?.map((value, index2) => {
                console.log("value");
                return <td key={index2}>{value}</td>
            })}
        </tr>

    )
}

export default DataTableRow