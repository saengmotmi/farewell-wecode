import styled from 'styled-components';
import type { InterfaceMessage } from './Messenger';

interface Props {
  message: InterfaceMessage;
}

const Message: React.FC<Props> = ({ message }) => {
  return (
    <Container>
      <div>
        <MessageProfileImage alt="user_profile_image" src={message.user_img} />
      </div>
      <div>
        <UserName>{message.username}</UserName>
        <Time>11:20 PM</Time>
        {message.text.split('\n').map((line, idx) => {
          return <Line key={idx}>{line}</Line>;
        })}
      </div>
    </Container>
  );
};

export default Message;

const Container = styled.div`
  padding: 8px 20px;
  display: flex;
`;

const MessageProfileImage = styled.img.attrs(() => ({
  width: '36',
  height: '36',
}))`
  border-radius: 4px;
  margin-right: 8px;
`;

const UserName = styled.span`
  margin-right: 8px;
  font-weight: bold;
`;

const Time = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.fontGray};
`;

const Line = styled.p`
  margin-top: 8px;
`;
