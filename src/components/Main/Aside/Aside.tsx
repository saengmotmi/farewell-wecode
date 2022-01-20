import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useChatWithState, useUserState } from 'recoil/users';
import type { User as IUser } from 'recoil/users';

const Aside: React.FC = () => {
  const [me] = useUserState();
  const { isLoading, data: users } = useQuery<IUser[]>('users', async () => {
    const response = await fetch('https://farewell-wecode-api.herokuapp.com/users');
    const data = await response.json();
    return data.users;
  });
  const [, setChatWith] = useChatWithState();

  // const isAdmin = me?.email === 'ohjtack@gracefulrain.co';

  return (
    <Container>
      <WorkSpace>
        <span>gracefulrain</span>
      </WorkSpace>
      <Categories>
        <CategoryName>Direct messages</CategoryName>
        {/* ?.filter(u => isAdmin || u.id === 1) */}
        {users?.map(user => {
          return (
            <User onClick={() => setChatWith(user)}>
              <UserProfileImage alt="user_profile_image" src={user.profile_img} />
              <UserName>{user.nickname}</UserName>
            </User>
          );
        })}
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
  margin: 10px 0;
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
