import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import UserWrapper from '@/components/UserWrapper.js';
import ItineraryDetail from '@/components/ItineraryDetail.js';

const ItineraryDestinasi = () => {
    const pageTitle = `Itinerary Destinasi | ${process.env.siteTitle}`
    const [destinasiWisata, setDestinasiWista] = useState([]);
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
                        const { data } = await axios.get(`user/rencanaku-ai-destinasi/${id}`);
                        setDestinasiWista(data[0].tw_perencanaan_otomatis);
                        setLoading(false);
                    } catch (error) {
                        if (error.response && error.response.status === 401) {
                            console.log(error);
                        }
                        if (error.response && error.response.status === 403) {
                            console.log(error);
                        }
                    } finally {
                        setLoading(false);
                    }
                }
            )()
        }
    }, [id]);
    return (
        <Layout>
            <UserWrapper>
                <SEO title={pageTitle} />
                <ItineraryDetail destinasiWisata={destinasiWisata} />
            </UserWrapper>
        </Layout>
    )
}

export default ItineraryDestinasi