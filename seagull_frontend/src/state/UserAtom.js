import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'isLogin',
  storage: sessionStorage,
});

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
