import styled from 'styled-components';

const Nav: React.FC = () => {
  return (
    <Container>
      <div />
      <SearchBar>Farewell Wecode :)</SearchBar>
      <LoginUser>
        <LoginUserImage
          alt="login_user_image"
          src="https://ca.slack-edge.com/T0F25KY9Y-U020D7262KH-3ac395a4150d-72"
        />
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
