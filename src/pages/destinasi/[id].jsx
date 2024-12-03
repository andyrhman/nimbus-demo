import React from 'react'
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import UserWrapper from '@/components/UserWrapper.js';

const DestinasiWisata = () => {
    const pageTitle = `Destinasi Wisata | ${process.env.siteTitle}`

    return (
        <Layout>
            <UserWrapper>
                <SEO title={pageTitle} />
                <h1>Test21q3</h1>
            </UserWrapper>
        </Layout>
    )
}

export default DestinasiWisata