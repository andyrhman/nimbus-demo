import React, { useState } from 'react';
import { useRouter } from 'next/router';
import SEO from './SEO.js';
import axios from 'axios';

const Auth = () => {
    const pageTitle = `Login | ${process.env.siteTitle}`;
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault();
        setEmailError(false);
        setLoading(true);
        setPasswordError('');
        setError('');

        try {
            const { data } = await axios.post('login', {
                email,
                password,
                rememberMe
            });

            if (data) {
                router.push('/');
            } else {
                setError('An error occurred during sign-in');
            }


        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
                if (errorMessage.includes('Username or Email')) {
                    setEmailError(errorMessage);
                }
                if (errorMessage.includes('Password')) {
                    setPasswordError(errorMessage);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError('');

        if (!value) {
            setPasswordError('Password must not be empty!');
        }
    };
    return (
        <>
            <SEO title={pageTitle} />
            <div className="flex flex-col justify-center items-center h-screen">
                <article className='prose'>
                    <h1>Sign In</h1>
                    <div className="font-normal">
                        Enter your details to sign-in.
                    </div>
                </article>

                {error && (
                    <div className="alert alert-error w-96">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submit}>
                    <div className="mb-4 flex flex-col">
                        <div className='mb-5'>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className={
                                    emailError
                                        ? ("input input-bordered input-error w-full max-w-full")
                                        : ("input input-bordered input-md w-full max-w-full")
                                }
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {emailError && <div className="text-red-500 text-xs mt-1">{emailError}</div>}
                        </div>
                        <div className='mb-5'>
                            <input
                                type="password"
                                placeholder="Password"
                                className={
                                    passwordError
                                        ? ("input input-bordered input-error w-full max-w-full")
                                        : ("input input-bordered w-full max-w-full")
                                }
                                onChange={(e) => validatePassword(e.target.value)}
                            />

                            {passwordError && <div className="text-red-500 text-xs mt-1">{passwordError}</div>}
                        </div>
                    </div>
                    <div className="form-control flex flex-row">
                        <label className="label cursor-pointer gap-4">
                            <input
                                type="checkbox"
                                className="checkbox"
                                onChange={(e) => setRememberMe(e.target.checked)}

                            />
                            <span className="label-text">Remember me</span>
                        </label>
                    </div>
                    <button className="btn btn-block btn-primary mt-4" type='submit'>
                        {loading 
                            ? <span className="loading loading-dots loading-lg text-warning"></span>
                            : "Login"
                        }
                    </button>
                </form>

            </div>

        </>
    )
}

export default Auth