import React from 'react';
import styled from 'styled-components';
import RoomUserUnit from '../ui/VideoShareRoom/\bRoomUserUnit';

const RoomUserForm = () => {
  return (
    <Wrap>
        <InviteButton>
            초대
        </InviteButton>
        <Title>
            참여자 (2)
        </Title>
        <Content>
            <RoomUserUnit/>
        </Content>
        
    </Wrap>
  )
}

const Wrap =styled.div`
`;

const InviteButton = styled.div`
    display: flex;
    justify-content: center;
    font-size: 15px;
    border-radius: 10px;
    /* padding-left: 18px; */
    align-items: center;
    height: 35px;
    width: 75px;
    box-sizing: border-box;
    margin-left: 20px;
    margin-top: 20px;
    color: white;
    background-color:#0e72ed ;
`;

const Title = styled.div`
    display: flex;
    padding-left: 22px;
    /* justify-content: flex-start; */
    align-items: center;
    height: 30px;
    width: 100%;
    margin: 10px 0px;
    /* background-color: aliceblue; */
    box-sizing: border-box;
    font-size: 13px;
    border-bottom: 1px solid #f4f4f4;
`

const Content = styled.div`
    width: 100%;
    height: calc(100vh - 200px);
    padding: 5px 20px;
    box-sizing: border-box;
`



export default RoomUserForm