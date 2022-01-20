import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useUserState } from 'recoil/users';

const Nav: React.FC = () => {
  const [me, setMe] = useUserState();
  const { data: user } = useQuery('user', async () => {
    const response = await fetch('http://localhost:8000/users/me', {
      method: 'GET',
      headers: { Authorization: localStorage.getItem('token') ?? '' },
    });
    const data = await response.json();
    return data.user;
  });

  useEffect(() => {
    if (user) {
      setMe(user);
    }
  }, [user]);

  console.log(user);

  return (
    <Container>
      <div />
      <SearchBar>Farewell Wecode :)</SearchBar>
      <LoginUser>
        <LoginUserImage alt="login_user_image" src={user?.profile_img} />
      </LoginUser>
    </Container>
  );
};

export default Nav;

const Container = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: ${({ theme }) => theme.deepBlack};
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  margin: 5px 0;
  max-width: 716px;
  background-color: ${({ theme }) => theme.gray};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.borderLightGray};
  font-size: 13px;
`;

const LoginUser = styled.div`
  padding: 0 16px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const LoginUserImage = styled.img.attrs(() => ({ width: 28, height: 28 }))`
  border-radius: 4px;
`;
