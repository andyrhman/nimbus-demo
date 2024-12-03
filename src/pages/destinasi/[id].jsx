import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import DestinasiDetail from '@/components/DestinasiDetail.js';
import DestinasiTerdekat from '@/components/DestinasiTerdekat.js';
import Top5Destinasi from '@/components/Top5Destinasi.js';
import UserWrapper from '@/components/UserWrapper.js';
import Breadcrumbs from '@/components/Breadcrumb.js';

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
                        if (data) {
                            setDestinasiWista(data);
                            setCategoryWisata(data.categoryWisata);
                            setProvinsi(data.provinsi);
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

    const [tempatWisataTerdekat, setTempatWisataTerdekat] = useState([]);

    useEffect(() => {
        const fetchTempatWisata = async () => {
            if (!destinasiWisata?.nama) {
                console.error("destinasiWisata.nama is not available.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const { data } = await axios.post('user/recommend-destinations', {
                    selected_place: destinasiWisata.nama
                });
                setTempatWisataTerdekat(data);
            } catch (err) {
                console.log(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (destinasiWisata?.nama) {
            fetchTempatWisata();
        }
    }, [destinasiWisata]);

    const [topFiveDestinations, setTopFiveDestinations] = useState([]);

    useEffect(() => {
        const fetchTopFiveDestinations = async () => {
            if (!destinasiWisata?.nama) {
                console.error("destinasiWisata.nama is not available.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response = await axios.post('user/top-five-similar', {
                    selected_place: destinasiWisata.nama
                });
                setTopFiveDestinations(response.data.top_five_similar_destinations || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (destinasiWisata?.nama) {
            fetchTopFiveDestinations();
        }
    }, [destinasiWisata]);

    return (
        <Layout>
            <UserWrapper>
                <SEO title={pageTitle} />
                <section className="py-2 sm:py-2">
                    <div className="container mx-auto px-4">
                        <Breadcrumbs title={loading ? 'Loading...' : destinasiWisata.nama} />
                    </div>
                </section>
                <DestinasiDetail
                    destinasiWisata={destinasiWisata}
                    nama={destinasiWisata.nama}
                    alamat={destinasiWisata.alamat}
                    categoryWisata={categoryWisata.nama}
                    google_link={destinasiWisata.google_link}
                    provinsi={provinsi.nama}
                    review_total={destinasiWisata.review_total}
                    thumbnail={destinasiWisata.thumbnail}
                    website={destinasiWisata.website}
                />
                <DestinasiTerdekat
                    nama_destinasi={destinasiWisata.nama}
                    loading={loading}
                    error={error}
                    tempatWisataTerdekat={tempatWisataTerdekat}
                />
                <Top5Destinasi
                    nama_destinasi={destinasiWisata.nama}
                    loading={loading}
                    error={error}
                    top5DestinasiSerupa={topFiveDestinations}
                />
            </UserWrapper>
        </Layout>
    )
}

export default DestinasiWisata