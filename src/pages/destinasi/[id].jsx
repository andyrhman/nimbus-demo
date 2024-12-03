import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import UserWrapper from '@/components/UserWrapper.js';

const DestinasiWisata = () => {
    const pageTitle = `Destinasi Wisata | ${process.env.siteTitle}`
    const [destinasiWisata, setDestinasiWista] = useState('');
    const [categoryWisata, setCategoryWisata] = useState('');
    const [provinsi, setProvinsi] = useState('');

    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            (
                async () => {
                    setLoading(true);
                    try {
                        const { data } = await axios.get(`user/tempat-wisata/${id}`);
                        setDestinasiWista(data);
                        setCategoryWisata(data.categoryWisata);
                        setProvinsi(data.provinsi);
                        setLoading(false);

                    } catch (error) {
                        console.log(error);
                    } finally {
                        setLoading(false);
                    }
                }
            )();
        }
    }, [id]);

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