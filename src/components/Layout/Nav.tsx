import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useUserState } from 'recoil/users';
import { useLocation } from 'react-router-dom';

const Nav: React.FC = () => {
  const location = useLocation();
  const [me, setMe] = useUserState();
  const { data: user, refetch } = useQuery('user', async () => {
    const response = await fetch('https://farewell-wecode-api.herokuapp.com/users/me', {
      method: 'GET',
      headers: { Authorization: localStorage.getItem('token') ?? '' },
    });
    const data = await response.json();
    return data.user;
  });

  useEffect(() => {
    if (user) {
      setMe(user);
    } else {
      refetch();
    }
  }, [user, location.pathname]);

  return (
    <Container>
      <div />
      <SearchBar>Farewell Wecode :)</SearchBar>
      <LoginUser>
        {user?.profile_img && <LoginUserImage alt="login_user_image" src={user?.profile_img} />}
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
