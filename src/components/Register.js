import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { toast, Slide } from 'react-toastify';
import axios from 'axios';
import SEO from './SEO.js';
import 'react-toastify/dist/ReactToastify.css';

const AuthRegister = () => {
    const pageTitle = `Register | ${process.env.siteTitle}`;
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    const [fullNameError, setFullNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const [strength, setStrength] = useState(0);

    const submit = async (e) => {
        e.preventDefault();
        setEmailError(false);
        setFullNameError(false);
        setUsernameError(false);
        setLoading(true);
        setPasswordError('');
        setConfirmPasswordError('');
        setError('');

        const data = {
            nama: fullName,
            email,
            password,
            username,
            password_confirm: confirmPassword
        };

        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        try {
            await axios.post('register', data);
            toast.success('Akun anda berhasil dibuat.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide
            });
            router.push('/login');
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);

                if (errorMessage.includes('fullName')) {
                    setFullNameError(errorMessage);
                }
                if (errorMessage.includes('Email')) {
                    setEmailError(errorMessage);
                }
                if (errorMessage.includes('Password')) {
                    setPasswordError(errorMessage);
                }
                if (errorMessage.includes('Username')) {
                    setUsernameError(errorMessage);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.match(/[a-z]/)) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        if (password.length >= 6) strength++;
        return strength;
    }

    const validatePassword = (value) => {
        setPassword(value);
        setPasswordError('');
        const strength = checkPasswordStrength(value);
        setStrength(strength);

        if (!value) {
            setPasswordError('Password is required');
        } else if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        }
    };

    const strengthBarColor = () => {
        switch (strength) {
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'lime';
            case 5: return 'green';
            default: return 'gray';
        }
    }

    const strengthText = () => {
        switch (strength) {
            case 1: return 'Too short';
            case 2: return 'Weak';
            case 3: return 'Okay';
            case 4: return 'Good';
            case 5: return 'Strong';
            default: return '';
        }
    }

    const validateConfirmPassword = (value) => {
        setConfirmPassword(value);
        setConfirmPasswordError('');

        if (!value) {
            setConfirmPasswordError('Confirm Password is required');
        } else if (value !== password) {
            setConfirmPasswordError('Passwords do not match');
        }
    };
    return (
        <>
            <SEO title={pageTitle} />
            <div className="flex flex-col justify-center items-center pt-11">
                <article className='prose'>
                    <h1>Register</h1>
                    <div className="mt-1 font-normal">
                        Enter your details to register.
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
                        <div className='mb-2'>
                            <label className="label">
                                <span className="label-text">Nama Lengkap</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Nama lengkap"
                                className={
                                    fullNameError
                                        ? ("input input-bordered input-error w-full max-w-full")
                                        : ("input input-bordered input-md w-full max-w-full")
                                }
                                onChange={(e) => setFullName(e.target.value)}
                            />

                            {fullNameError && <div className="text-red-500 text-xs mt-1">{fullNameError}</div>}
                        </div>
                        <div className='mb-2'>
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                className={
                                    usernameError
                                        ? ("input input-bordered input-error w-full max-w-full")
                                        : ("input input-bordered input-md w-full max-w-full")
                                }
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            {usernameError && <div className="text-red-500 text-xs mt-1">{usernameError}</div>}
                        </div>
                        <div className='mb-2'>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                className={
                                    emailError
                                        ? ("input input-bordered input-error w-full max-w-full")
                                        : ("input input-bordered input-md w-full max-w-full")
                                }
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            {emailError && <div className="text-red-500 text-xs mt-1">{emailError}</div>}
                        </div>
                        <div className='mb-2'>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
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
                            <div style={{
                                fontSize: '12px',
                                textAlign: 'right',
                                color: strengthBarColor(),
                            }}>
                                {strengthText()}
                            </div>
                            <div style={{
                                height: '10px',
                                width: `${strength * 20}%`,
                                backgroundColor: strengthBarColor(),
                                transition: 'width 0.3s ease-in-out',
                            }} />
                            {passwordError && <div className="text-red-500 text-xs mt-1">{passwordError}</div>}
                        </div>
                        <div className='mb-2'>
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className={
                                    confirmPasswordError
                                        ? ("input input-bordered input-error w-full max-w-full")
                                        : ("input input-bordered w-full max-w-full")
                                }
                                onChange={(e) => validateConfirmPassword(e.target.value)}
                            />

                            {confirmPasswordError && <div className="text-red-500 text-xs mt-1">{confirmPasswordError}</div>}
                        </div>
                    </div>
                    <button className="btn btn-block btn-primary mt-4" type='submit'>
                        {loading
                            ? <span className="loading loading-dots loading-lg text-warning"></span>
                            : "Register"
                        }
                    </button>
                </form>
            </div>
        </>
    )
}

export default AuthRegister