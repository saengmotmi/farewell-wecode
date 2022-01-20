import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

declare global {
  interface Window {
    gapi: any;
  }
}

type LoginResponse = { message: string; token: string };

const Auth: React.FC = () => {
  const navigate = useNavigate();

  const onSignIn = async (googleUser: any) => {
    const res: LoginResponse = await fetch(
      'https://farewell-wecode-api.herokuapp.com/auth/google',
      {
        method: 'POST',
        headers: {
          Authorization: googleUser.getAuthResponse().id_token,
        },
        body: JSON.stringify({
          googleId: googleUser.googleId,
          email: googleUser.profileObj.email,
        }),
      }
    ).then(res => res.json());

    localStorage.setItem('token', res.token);
    navigate('/');
  };

  return (
    <Container>
      <Form>
        <Title>종택의 인사 메시지를 확인해보세요</Title>
        <Description>
          <b>잘 읽었다면 답장도</b> 남기실 수 있도록 준비해두었습니다 :)
        </Description>
        <GoogleLogin
          clientId="968558418267-hcf23qtoaiap7upvm01658nhd3buobbr.apps.googleusercontent.com"
          buttonText="Google로 로그인 하기"
          onSuccess={googleUser => {
            console.log(googleUser);
            onSignIn(googleUser);
          }}
          onFailure={err => console.log('fail', err)}
          cookiePolicy={'single_host_origin'}
        />
      </Form>
    </Container>
  );
};

export default Auth;

const Container = styled.div`
  height: calc(100vh - 34px);
  background-color: ${({ theme }) => theme.black};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  line-height: 46px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 32px;
`;
