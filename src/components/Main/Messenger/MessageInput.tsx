import { forwardRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { nanoid } from 'nanoid';
import { useUserState, useChatWithState } from 'recoil/users';

interface Props {
  resizeTextarea: VoidFunction;
  resetTextarea: VoidFunction;
}

interface Message {
  created_at: Date;
  id: string;
  text: string;
  user_id: number;
  username: string;
  user_img: string;
}

const MessageInput = forwardRef<HTMLTextAreaElement, Props>(
  ({ resizeTextarea, resetTextarea }, ref) => {
    const [me] = useUserState();
    const [chatWith] = useChatWithState();
    const client = useQueryClient();

    const mutation = useMutation(
      (message: Message) => {
        const search = new URLSearchParams({
          from: String(me!.id),
          to: String(chatWith.id),
        });
        const qs = '?' + search.toString();

        return fetch('http://localhost:8000/chat/create' + qs, {
          method: 'POST',
          body: JSON.stringify(message),
        });
      },
      {
        onSuccess: () => {
          client.invalidateQueries(['chat', chatWith.id]);
        },
      }
    );

    const sendMessage = (message: string) => {
      mutation.mutate({
        created_at: new Date(),
        id: nanoid(),
        text: message,
        user_id: me!.id,
        username: me!.nickname,
        user_img: me!.profile_img,
      });
    };

    return (
      <TextArea
        ref={ref}
        inputMode="text"
        placeholder={'Message ' + me?.nickname}
        maxLength={80}
        minRows={1}
        maxRows={10}
        onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e.currentTarget.value);
            resetTextarea();
            e.currentTarget.value = '';
          }
        }}
        onChange={e => {
          resizeTextarea();
        }}
      />
    );
  }
);

export default MessageInput;

const TextArea = styled(TextareaAutosize)`
  display: block;
  padding: 8px 12px;
  margin: 0 18px 24px;
  border: 1px solid ${({ theme }) => theme.borderLightGray};
  border-radius: 8px;
  color: ${({ theme }) => theme.fontWhite};
  background-color: ${({ theme }) => theme.gray};
  resize: none;
  outline: none;
  font-family: 'Lato';
`;
