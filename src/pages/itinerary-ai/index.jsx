import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { toast, Slide } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link.js';
import Image from 'next/image.js';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import UserWrapper from '@/components/UserWrapper.js';
import formatCreationDate from '@/services/formatCreationDate.js';
import DeleteNotification from '@/components/Delete.js';
import 'react-toastify/dist/ReactToastify.css';

const ItineraryAI = () => {
    const pageTitle = `Itinerary AI | ${process.env.siteTitle}`
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (
            async () => {
                setLoading(true);
                try {
                    const { data } = await axios.get(`user/rencanaku-ai`);
                    setItinerary(data);
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        router.push('/');
                    }
                    if (error.response && error.response.status === 403) {
                        router.push('/');
                    }
                } finally {
                    setLoading(false);
                }
            }
        )()
    }, [router]);

    const [itineraryId, setItineraryId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => setOpenDialog(!openDialog);

    useEffect(() => {
        const deleteSuccess = sessionStorage.getItem('deleteSuccess');
        if (deleteSuccess === '1') {
            toast.success('Berhasil Dihapus!', {
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
            sessionStorage.removeItem('deleteSuccess');
        }
    }, []);

    const handleConfirmDelete = async () => {
        setLoading(true);

        try {
            await axios.delete(`user/rencana-otomatis/${itineraryId}`);
            setItinerary(itinerary.filter((it) => it.id !== itineraryId));
            handleOpenDialog();
            sessionStorage.setItem('deleteSuccess', '1');
            window.location.reload();
        } catch (error) {
            if (error.response && [401, 403].includes(error.response.status)) {
                router.push('/itinerary-ai');
            }
        } finally {
            setLoading(false);
        }
    };

    const del = (id) => {
        setItineraryId(id);
        handleOpenDialog();
    };

    return (
        <Layout>
            <UserWrapper>
                <SEO title={pageTitle} />
                {loading ?
                    <>
                        <div className="flex h-screen items-center justify-center">
                            <div className="h-16 w-16 animate-spin  rounded-full border-4 border-solid border-violet-500 border-t-transparent"></div>
                        </div>
                    </> :
                    <>
                        <DeleteNotification open={openDialog} handleOpenDelete={handleOpenDialog} handleConfirmDelete={handleConfirmDelete} loading={loading} />
                        {itinerary.length > 0 ? (
                            <>
                                <div className="wrapper translate-x-[0] opacity-1 duration-500 font-poppins">
                                    <div className="flex flex-col justify-center items-center py-2 sm:rounded-lg">
                                        <div className="relative my-7">
                                            <Link href={'/itinerary-ai/create'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                                Buat Itinerary AI
                                            </Link>
                                        </div>
                                        {itinerary?.map((i, index) => (
                                            <div key={index}>
                                                <div className="my-6 card bg-base-100 w-96 shadow-xl">
                                                    <div className="card-actions bg-red-600 justify-end">
                                                        <button className="hover:text-primary" onClick={() => del(i.id)}>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-6 w-6"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <Link href={`/itinerary-ai/show/${String(i.id)}`}>
                                                        <div className="card-body">
                                                            <h2 className="card-title">
                                                                {i.nama}
                                                            </h2>
                                                            <div className="badge badge-secondary">{formatCreationDate(i.created_at)}</div>
                                                            <p>Budget Rp{new Intl.NumberFormat('id-ID').format(i.budget)}</p>
                                                            <div className="card-actions justify-end">
                                                                <div className="badge badge-outline">{i.provinsi.nama}</div>
                                                                <div className="badge badge-outline">{i.categoryWisata.nama}</div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) :
                            (
                                <div className="wrapper translate-x-[0] opacity-1 duration-500 mt-28 font-poppins">
                                    <div className="flex flex-col justify-center items-center text-center py-10 sm:rounded-lg">

                                        <h2 className="text-4xl font-extrabold">Itinerary kamu kosong 😱!</h2>
                                        <p className="my-4 text-lg text-gray-500">
                                            Mulai buat sekarang Itinerary otomatis menggunakan Machine Learning.
                                        </p>

                                        <Image src="/not-found.png" alt="Not Found" width={120} height={120} priority />
                                        <div className="relative my-7">
                                            <Link href={'/itinerary-ai/create'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                                Buat Itinerary
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </>
                }
            </UserWrapper>
        </Layout>
    )
}

export default ItineraryAI