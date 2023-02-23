import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import webSocketAPI from '../../apis/webSocketAPI';
import Loading from '../layout/Loading';
import NotFound from './NotFound';
import VideoShareRoom from './VideoShareRoom';

const PrivateRoute = () => {
  const roomlink = useParams();
  const [loading, setLoading] = useState(null);

  const [existLink, setExistLink] = useState();

  const entryRoomSocket = async () => {
    await webSocketAPI
      .get(`/room/${roomlink.roomlink}`)
      .then((res) => {
        console.log(res);
        setExistLink(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    entryRoomSocket();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {existLink === true ? <VideoShareRoom /> : <NotFound />}
    </>
  );
};

export default PrivateRoute;
