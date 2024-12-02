import React from 'react';
import Link from 'next/link';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { connect } from "react-redux";
const Navbar = ({ user }) => {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className='navbar-start'>
                    <div className='dropdown'>
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link href={"/itinerary"} className="btn btn-ghost normal-case text-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-robot" viewBox="0 0 16 16">
                                        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135" />
                                        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
                                    </svg>
                                    AI Itinerary
                                </Link>
                            </li>
                            <li>
                                <Link href={"/login"}>
                                    <ArrowLeftOnRectangleIcon strokeWidth={2} className="h-6 w-6" />Login
                                </Link>
                            </li>
                            <li>
                                <Link href={"/register"}>
                                    <ArrowLeftOnRectangleIcon strokeWidth={2} className="h-6 w-6" />Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <Link href={"/"} className="btn btn-ghost normal-case text-xl">Nimbus</Link>
                </div>
                <div className='navbar-center hidden lg:flex'>
                    <Link href={"/itinerary"} className="btn btn-ghost normal-case text-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-robot" viewBox="0 0 16 16">
                            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135" />
                            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
                        </svg>
                        AI Itinerary
                    </Link>
                </div>
                <div className='navbar-end'>
                    {user ? (
                        <>
                            <div className="dropdown dropdown-end hidden lg:flex">
                                <button type='button' className="btn btn-ghost normal-case text-md">{user?.username}</button>
                            </div>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.profile_pic} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>Logout</a></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="dropdown dropdown-end hidden lg:flex">
                                <Link href={'/login'} className="btn btn-ghost normal-case text-md">Login</Link>
                            </div>
                            <div className="dropdown dropdown-end hidden lg:flex">
                                <Link href={'/register'} className="btn btn-ghost normal-case text-md">Register</Link>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </>
    )
}

export default connect(
    (state) => {
        return {
            user: state.user.user
        }
    }
)(Navbar);