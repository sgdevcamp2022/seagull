import React from 'react';
import styled from 'styled-components';
import {useState } from 'react';
import LeavePopover from './LeavePopover';

const LeaveButton = () => {

    const [isPopperShown, setIsPopperShown] =useState(false);

    const onOpenerClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsPopperShown(!isPopperShown);
      };

  return (
    <Wrap>
    {isPopperShown && <LeavePopover onOpenerClick={onOpenerClick} />}
    <LeaveBtn onClick={onOpenerClick}>
        Leave
    </LeaveBtn>
    </Wrap>
  )
}

const Wrap =styled.div`
    height: 40px;
    /* width: 40%; */
    position: relative;
`;

const LeaveBtn =styled.div`
    width: 80px;
    height: 100%;
    color: white;
    background-color: grey;
    align-items: center;
    display: flex;
    justify-content: center;
    font-weight:bold;
    border-radius: 5px;
    /* margin: 0 30px auto auto; */
    cursor: pointer;
    transition-duration:0.2s;
    &:hover {
        background-color: red;
    }
`;

export default LeaveButton