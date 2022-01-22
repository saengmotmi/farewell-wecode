import styled from 'styled-components';
import Aside from 'components/Main/Aside';
import Messenger from 'components/Main/Messenger';
import { useUserState } from 'recoil/users';

function App() {
  const [user] = useUserState();

  if (!user) return <>loading...</>;

  return (
    <Container>
      <Aside />
      <Messenger />
    </Container>
  );
}

export default App;

const Container = styled.main`
  display: grid;
  grid-template-areas: 'aside messenger';
  grid-template-columns: 260px auto;
  background-color: ${({ theme }) => theme.black};

  @media (max-width: 768px) {
    grid-template-columns: auto;
  }
`;
