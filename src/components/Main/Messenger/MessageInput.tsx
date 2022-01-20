import { forwardRef } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  resizeTextarea: VoidFunction;
}

const MessageInput = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  return (
    <TextArea
      ref={ref}
      inputMode="text"
      placeholder="Message 멘토 오종택"
      maxLength={80}
      minRows={1}
      maxRows={10}
      onChange={e => {
        console.log(e.target.value);
        props.resizeTextarea();
      }}
    />
  );
});

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
