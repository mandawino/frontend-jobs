import React from 'react';

const Total = (props) => {
    let total = props.total ? `Total number of Binary : ${props.total}` : '';
    return <h4 className="total">{total}</h4>
}

export default Total;