import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link.js";
import Image from "next/image.js";

const TravelCard = () => {
    const [tempatWisata, setTempatWisata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchTempatWisata = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data } = await axios.get('user/tempat-wisata', {
                    params: { search: searchTerm, page },
                });

                setTempatWisata(data);
                setHasMore(data.length === 20);
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false);
            }
        };

        fetchTempatWisata();
    }, [searchTerm, page]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };


    return (
        <section className="py-20">
            <h1 className="mb-12 text-center font-sans text-5xl font-bold text-gray-900">Nimbus Demo. Lebih dari 1.843 destinasi wisata.<span className="text-blue-600">.</span></h1>
            <div className="mx-auto max-w-screen-xl px-6">
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Cari Tempat Wisata"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-5 w-5 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : tempatWisata.length > 0 ? (
                <div className="mx-auto max-w-screen-xl p-6">
                    {/* Travel Cards Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {tempatWisata.map((tw, index) => (
                            <div key={index}>

                                <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
                                    <Link href={`/destinasi/${tw.id}`}>
                                        <div className="relative flex items-end overflow-hidden rounded-xl">
                                            <Image layout="fill" className="!relative" src={tw.thumbnail} alt="Hotel Photo" />
                                            <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-slate-400 ml-1 text-sm">
                                                    {tw.average_rating} &nbsp;
                                                    {`(${tw.review_total})`}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-1 p-2">
                                            <h2 className="text-slate-700">{tw.nama}</h2>
                                            <p className="text-slate-400 mt-1 text-sm">{tw.provinsi.nama}</p>

                                            <div className="mt-3 flex items-end justify-between">
                                                <p>
                                                    <span className="text-lg font-bold text-blue-500">{tw.categoryWisata.nama}</span>
                                                </p>

                                                <div className="group inline-flex rounded-xl bg-blue-100 p-2 hover:bg-blue-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-right-circle-fill group-hover:text-blue-500 h-4 w-4 text-blue-400" viewBox="0 0 16 16" fill="currentColor">
                                                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            disabled={page === 1}
                            onClick={() => handlePageChange(page - 1)}
                            className={`px-4 py-2 text-white rounded ${page === 1 ? 'bg-graydark cursor-not-allowed' : 'bg-primary hover:bg-primary'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                            </svg>
                        </button>

                        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                            {page}
                        </span>

                        <button
                            disabled={!hasMore}
                            onClick={() => handlePageChange(page + 1)}
                            className={`px-4 py-2 text-white rounded ${!hasMore ? 'bg-graydark cursor-not-allowed' : 'bg-primary hover:bg-primary'
                                }`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center text-center py-10'>
                    <Image src="/not-found.png" alt="Not Found" width={120} height={120} priority />
                    <h4>Data Tidak Ditemukan</h4>
                </div>
            )}
        </section>
    )
}

export default TravelCard