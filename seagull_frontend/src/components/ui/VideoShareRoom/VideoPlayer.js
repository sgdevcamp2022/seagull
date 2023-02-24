import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

const VideoPlayer = ({
  url,
  videoRef,
  controls,
  playing,
  style,
  sendVideo,
  isHost,
}) => {
  return (
    <Wrap>
      <VideoPlayWrap>
        {url ? (
          <ReactPlayer
            key={url}
            ref={videoRef}
            className="react-player"
            url={url}
            width="100%"
            height="100%"
            controls={controls}
            muted={true}
            playing={playing}
            progressInterval={1000}
            style={style}
            onProgress={() => {
              if (isHost) {
                if (playing) {
                  sendVideo(
                    'Control:sync',

                    videoRef.current.getCurrentTime()
                  );
                } else {
                  sendVideo('Control:sync', videoRef.current.getCurrentTime());
                }
              }
            }}
            onPause={() => {
              if (isHost) {
                sendVideo('Control:play', 'true');
              }
            }}
            onPlay={() => {
              if (isHost) {
                sendVideo('Control:play', 'false');
              }
            }}
          />
        ) : (
          'No Video'
        )}
      </VideoPlayWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: calc(100vh - 130px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const VideoPlayWrap = styled.div`
  width: 90%;
  height: calc(100vh - 130px);
  background-color: black;
  color: grey;
  font-size: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default VideoPlayer;
