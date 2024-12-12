import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import UserWrapper from '@/components/UserWrapper.js';
import { useRouter } from 'next/router';
import { toast, Slide } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';

const CreateItineraryAI = () => {
    const pageTitle = `Buat Itinerary AI | ${process.env.siteTitle}`
    const [provinsi, setProvinsi] = useState([]);
    const [categoryWisata, setCategoryWisata] = useState([]);
    const [nama, setNama] = useState('');
    const [provinsi_id, setProvinsiId] = useState('');
    const [categoryWisata_id, setCategoryWisataId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        (
            async () => {
                try {
                    const { data: prov } = await axios.get('user/provinsi');
                    setProvinsi(prov);

                    const { data: cat } = await axios.get('user/category-wisata');
                    setCategoryWisata(cat);
                } catch (error) {
                    if (error.response && [401, 403].includes(error.response.status)) {
                        router.push('/')
                    }
                }
            }
        )();
    }, [router])

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await axios.post('user/rencana-otomatis', {
                nama,
                provinsi_id: Number(provinsi_id),
                categoryWisata_id: Number(categoryWisata_id)
            });

            if (data) {
                toast.success('Itineray berhasil dibuat!', {
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
                router.push('/itinerary-ai')
            } else {
                setError('Terjadi kesalahan, mohon ulang lagi sebentar.');
            }
        } catch (error) {
            console.error(error.response);
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    }

    const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
        <input
            type="text"
            className="input input-bordered w-full max-w-full"
            onClick={onClick}
            ref={ref}
            value={value}
            readOnly
        />
    ));
    CustomDateInput.displayName = "CustomDateInput";
    return (
        <Layout>
            <UserWrapper>
                <SEO title={pageTitle} />
                <div className="container mx-auto px-4 py-8 max-w-xl">
                    <div className='md:flex md:flex-col'>
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
                        <form onSubmit={submit}>
                            <div className='mb-5'>
                                <label className="label">
                                    <span className="label-text">Nama Rencanamu</span>
                                </label>
                                <input
                                    onChange={(e) => setNama(e.target.value)}
                                    type="text"
                                    placeholder="Masukkan nama rencanamu"
                                    className="input input-bordered w-full max-w-full"
                                />
                            </div>
                            <div className='mb-5'>
                                <label className="label">
                                    <span className="label-text">Provinsi</span>
                                </label>
                                <select
                                    onChange={(e) => setProvinsiId(e.target.value)}
                                    className="select select-bordered w-full max-w-full"
                                    value={`${provinsi_id}`}
                                >
                                    <option disabled value="">Pilih Provinsi</option>
                                    {provinsi.map((p) => (
                                        <option key={p.id} value={p.id}>{p.nama}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-5'>
                                <label className="label">
                                    <span className="label-text">Category Wisata</span>
                                </label>
                                <select
                                    onChange={(e) => setCategoryWisataId(e.target.value)}
                                    className="select select-bordered w-full max-w-full"
                                    value={`${categoryWisata_id}`}
                                >
                                    <option disabled value="">Pilih Category Wisata</option>
                                    {categoryWisata.map((cw) => (
                                        <option key={cw.id} value={cw.id}>{cw.nama}</option>
                                    ))}
                                </select>
                            </div>
                            <button className="btn btn-block btn-primary mt-4" type='submit'>
                                {loading
                                    ? <span className="loading loading-dots loading-lg text-warning"></span>
                                    : "Buat Itinerary AI"
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </UserWrapper>
        </Layout>
    )
}

export default CreateItineraryAI