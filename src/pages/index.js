import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import TravelCard from '@/components/TravelCard.js';
import UserWrapper from '@/components/UserWrapper.js';
import Navbar from '@/components/Navbar.js';
import axios from 'axios';
import { clearUser } from "@/redux/actions/setUserAction";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router.js';
const HomePage = () => {
  const pageTitle = `Home | ${process.env.siteTitle}`
  const dispatch = useDispatch();
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.post('user/logout', {});
      dispatch(clearUser());
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Layout>
      <SEO title={pageTitle} />
      <Navbar />
      <button onClick={logout} className="btn btn-ghost normal-case text-md">Logout</button>
      <UserWrapper>
        <TravelCard />
      </UserWrapper>
    </Layout >
  )
}

export default HomePage;