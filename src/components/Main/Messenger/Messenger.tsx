import styled from 'styled-components';

const messages = [
  {
    id: 1,
    created_at: new Date(),
    username: '멘토 오종택',
    text: `
      안녕하세요
      반갑습니다
    `,
  },
];

const Messenger: React.FC = () => {
  return (
    <Container>
      <User>
        <UserProfileImage
          alt="user_profile_image"
          src="https://ca.slack-edge.com/T0F25KY9Y-U020D7262KH-3ac395a4150d-72"
        />
        <UserName>멘토 양준식</UserName>
      </User>
      <MessageArea>
        {messages.map(message => {
          return (
            <div style={{ display: 'flex' }}>
              <span>{message.username}</span>
              <div>
                {message.text.split('\n').map((line, idx) => {
                  return <p key={idx}>{line}</p>;
                })}
              </div>
            </div>
          );
        })}
      </MessageArea>
    </Container>
  );
};

export default Messenger;

const Container = styled.div`
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

const MessageArea = styled.section``;
