import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import DestinasiDetail from '@/components/DestinasiDetail.js';
import UserWrapper from '@/components/UserWrapper.js';
import Breadcrumbs from '@/components/Breadcrumb.js';

const DestinasiWisata = () => {
    const pageTitle = `Destinasi Wisata | ${process.env.siteTitle}`
    const [destinasiWisata, setDestinasiWista] = useState({});
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
                        if (data) {
                            setDestinasiWista(data);
                            setCategoryWisata(data.categoryWisata || {});
                            setProvinsi(data.provinsi || {});
                            setLoading(false);

                        } else {
                            setError('No data found');
                        }

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
                <section className="py-2 sm:py-2">
                    <div className="container mx-auto px-4">
                        <Breadcrumbs title={loading ? 'Loading...' : destinasiWisata?.nama || 'Unnamed Destinasi'} />
                    </div>
                </section>
                <DestinasiDetail
                    destinasiWisata={destinasiWisata}
                    nama={destinasiWisata?.nama || 'No Name'}
                    alamat={destinasiWisata?.alamat || 'No Address'}
                    categoryWisata={categoryWisata?.nama || 'No Category'}
                    google_link={destinasiWisata?.google_link || '#'}
                    provinsi={provinsi?.nama || 'No Province'}
                    review_total={destinasiWisata?.review_total || 0}
                    thumbnail={destinasiWisata?.thumbnail || '#'}
                    website={destinasiWisata?.website || '#'}
                />

            </UserWrapper>
        </Layout>
    )
}

export default DestinasiWisata