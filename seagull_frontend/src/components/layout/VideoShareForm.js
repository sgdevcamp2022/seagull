import React from 'react';
import ReactPlayer from 'react-player';
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
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const VideoWrap = styled.div`
  width: 90%;
  height: calc(100vh - 120px);
  background-color: white;
`;

export default VideoShareForm;
