import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const UserState = atom({
  key: 'UserState',
  default: {},
});

export const LoginState = atom({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

//test_user
export const UserName = atom({
  key: 'UserName',
  default: {},
});

//chat
export const ChatMessageState = atom({
  key: 'ChatMessageState',
  default: '',
});

//video_share
export const HostState = atom({
  key: 'HostState',
  default: '',
});

export const VideoState = atom({
  key: 'VideoState',
  default: {
    url: null,
    pip: false,
    playing: false,
    controls: true,
    light: false,
    volume: 0.8,
    muted: true,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    progressInterval: 1000,
    style: {},
  },
});
