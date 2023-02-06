import React from 'react';
import styled from 'styled-components';

const VideoShareForm = () => {
  return (
    <Wrap>
      <VideoWrap></VideoWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: calc(100vh - 120px);
  /* background-color: aqua; */
  /* margin-top: 5px; */
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const VideoWrap = styled.div`
  width: 90%;
  height: calc(100vh - 120px);
  /* border: 1px solid gray; */
  background-color: white;
`;

export default VideoShareForm;
