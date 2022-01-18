import styled from 'styled-components';

const Aside: React.FC = () => {
  return (
    <Container>
      <WorkSpace>
        <span>gracefulrain</span>
      </WorkSpace>
      <Categories>
        <CategoryName>Direct messages</CategoryName>
        <User>
          <UserProfileImage
            alt="user_profile_image"
            src="https://ca.slack-edge.com/T0F25KY9Y-U020D7262KH-3ac395a4150d-72"
          />
          <UserName>멘토 양준식</UserName>
        </User>
      </Categories>
    </Container>
  );
};

export default Aside;

const Container = styled.aside`
  border: 1px solid ${({ theme }) => theme.borderGray};
`;

const WorkSpace = styled.div`
  padding: 15px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.borderGray};

  span {
    font-weight: 900;
    font-size: 18px;
  }
`;

const Categories = styled.ul`
  padding: 0 16px;
`;

const CategoryName = styled.p`
  padding: 18px 0;
`;

const User = styled.li`
  display: flex;
  align-items: center;
  padding-left: 6px;
  cursor: pointer;
`;

const UserName = styled.span``;

const UserProfileImage = styled.img.attrs(() => ({
  width: '20',
  height: '20',
}))`
  border-radius: 4px;
  margin-right: 8px;
`;
