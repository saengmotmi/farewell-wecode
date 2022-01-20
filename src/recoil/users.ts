import { atom, useRecoilState } from 'recoil';

export interface User {
  email: string;
  id: number;
  nickname: string;
  profile_img: string;
}

export const userState = atom<User | undefined>({
  key: 'userState',
  default: undefined,
});

export const useUserState = () => {
  return useRecoilState(userState);
};

export const chatWithState = atom<User>({
  key: 'chatWithState',
  default: {
    email: 'ohjtack@gracefulrain.co',
    id: 1,
    nickname: '멘토 오종택',
    profile_img: 'https://ca.slack-edge.com/T0F25KY9Y-U020D7262KH-3ac395a4150d-72',
  },
});

export const useChatWithState = () => {
  return useRecoilState(chatWithState);
};
