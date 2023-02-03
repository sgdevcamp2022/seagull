import React from 'react';
import styled from 'styled-components';

const LeaveButton = () => {
  return (
    <LeaveBtn>
        Leave
    </LeaveBtn>
  )
}

const LeaveBtn =styled.div`
    width: 80px;
    height: 40px;
    color: white;
    background-color: red;
    align-items: center;
    display: flex;
    justify-content: center;
    font-weight:bold;
    border-radius: 5px;
    margin: 15px 50px auto auto;
    cursor: pointer;
    transition-duration:0.2s;
    &:hover {
        background-color: gray;
    }
`;

export default LeaveButton