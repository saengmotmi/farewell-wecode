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
    <>
      <GoogleLogin
        clientId="968558418267-6dj3n7e1a7f74d2dd23cmjvb3osi1rqs.apps.googleusercontent.com"
        buttonText="Google로 로그인 하기"
        onSuccess={onSignIn}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
};

export default Auth;
