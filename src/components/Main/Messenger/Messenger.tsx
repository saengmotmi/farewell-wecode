import { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Message from './Message';
import MessageInput from './MessageInput';
import { useChatWithState, useUserState } from 'recoil/users';
import { BASE_URL } from 'config';

export interface InterfaceMessage {
  created_at: Date;
  id: string;
  text: string;
  user_id: string;
  username: string;
  user_img: string;
}

const Messenger: React.FC = () => {
  const messageAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [height, setHeight] = useState(0);
  const [me] = useUserState();
  const [chatWith] = useChatWithState();

  const { data: chat } = useQuery(['chat', chatWith.id], async () => {
    const search = new URLSearchParams({
      from: String(me!.id),
      to: String(chatWith.id),
    });
    const qs = '?' + search.toString();

    const response = await fetch(BASE_URL + '/chat' + qs, {
      method: 'GET',
    }).then(res => res.json());

    return Object.values(response.chat) as InterfaceMessage[];
  });

  useEffect(() => {
    resizeTextarea();
  }, []);

  useEffect(() => {
    messageAreaRef.current?.scrollTo(0, messageAreaRef.current?.scrollHeight);
  }, [height]);

  const resizeTextarea = () => {
    const { height } = inputRef.current?.getBoundingClientRect()!;
    const { marginTop, marginBottom } = window.getComputedStyle(inputRef.current!)!;

    setHeight(height + parseInt(marginTop) + parseInt(marginBottom) + 2);
  };

  const resetTextarea = () => {
    setHeight(61);
  };

  return (
    <Container inputHeight={height}>
      <User>
        <UserProfileImage alt="user_profile_image" src={chatWith?.profile_img} />
        <UserName>{chatWith?.nickname}</UserName>
      </User>
      <MessageArea ref={messageAreaRef} inputHeight={height}>
        {chat?.map(chat => (
          <Message key={chat.id} message={chat} />
        ))}
      </MessageArea>
      <MessageInput ref={inputRef} resizeTextarea={resizeTextarea} resetTextarea={resetTextarea} />
    </Container>
  );
};

export default Messenger;

const Container = styled.div<{ inputHeight: number }>`
  display: grid;
  grid-template-rows: 49px auto ${({ inputHeight }) => inputHeight}px;
  border-top: 1px solid ${({ theme }) => theme.borderGray};
`;

const User = styled.section`
  padding: 12px 18px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.borderGray};
`;

const UserName = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const UserProfileImage = styled.img.attrs(() => ({
  width: '24',
  height: '24',
}))`
  border-radius: 4px;
  margin-right: 8px;
`;

const MessageArea = styled.section<{ inputHeight: number }>`
  max-height: calc(100vh - ${({ inputHeight }) => inputHeight}px - 49px - 34px);
  overflow: scroll;
`;
