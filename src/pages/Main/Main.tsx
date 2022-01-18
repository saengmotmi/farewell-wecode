import styled from 'styled-components';
import Aside from 'components/Main/Aside';
import Messenger from 'components/Main/Messenger';

function App() {
  return (
    <Container>
      <Aside />
      <Messenger />
    </Container>
  );
}

export default App;

const Container = styled.main`
  height: 100vh;
  display: grid;
  grid-template-areas: 'aside messenger';
  grid-template-columns: 260px auto;

  background-color: ${({ theme }) => theme.black};
`;
