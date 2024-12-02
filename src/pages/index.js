import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import TravelCard from '@/components/TravelCard.js';
import Navbar from '@/components/Navbar.js';
import UserWrapper from '@/components/UserWrapper.js';

const HomePage = () => {
  const pageTitle = `Home | ${process.env.siteTitle}`
  return (
    <Layout>
      <UserWrapper>
        <SEO title={pageTitle} />
        <TravelCard />
      </UserWrapper>
    </Layout>
  )
}

export default HomePage;