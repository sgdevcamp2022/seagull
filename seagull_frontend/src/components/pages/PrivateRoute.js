import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import webSocketAPI from '../../apis/webSocketAPI';
import NotFound from './NotFound';
import VideoShareRoom from './VideoShareRoom';

const PrivateRoute = () => {
  const roomlink = useParams();
  console.log(roomlink.roomlink);

  const [existLink, setExistLink] = useState();

  const entryRoomSocket = async () => {
    await webSocketAPI
      .get(`/room/${roomlink.roomlink}`)
      .then((res) => {
        console.log(res);
        setExistLink(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    entryRoomSocket();
  }, []);

  return existLink === true ? <VideoShareRoom /> : <NotFound />;
};

export default PrivateRoute;
