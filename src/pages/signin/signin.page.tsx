import './signin.css';
import { partialLogo, mainPagePic } from '../../assets';
import { Input, PasswordInput, Button } from '../../components/core';
import { Link } from 'react-router-dom';
import { useSignin } from '../../hooks';

const Signin = () => {
    const signin = useSignin();
    return (
        <div className='signin'>
            <div className='signinWrapper'>
                <img src={partialLogo} alt="" />
                <form className='signinForm' onSubmit={signin.handleValidation}>
                    <Input Height={40} Width={360} Radius={15} PlaceHolder='example@gmail.com' name='email' Label='Email' />
                    <PasswordInput height={40} Width={360} Radius={15} Placeholder='Password' name='password' state='none' Label=' Password' />
                    {!signin.validLogin && <span>Email or password is incorrect , please try again.</span>}
                    <Button
                        HtmlType='submit'
                        FontWeight={'inherit'}
                        FontSize='16'
                        Ratio='100/10'
                        Width='380'
                        Radius='20'
                    >
                        Login
                    </Button>
                </form>
                <p>
                    Don't have an account?
                    <Link to={'/signup'}>Signup</Link>
                </p>
            </div>
            <img src={mainPagePic} alt="main pic" className='mainPic' />

        </div>
    );
};
export default Signin;