import ProductReviewStar from './ProductReviewStar.js';

const DestinasiDetail = ({
    destinasiWisata,
    nama,
    alamat,
    categoryWisata,
    provinsi,
    thumbnail
}) => {
    return (
        <>
            <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                <div className="lg:col-span-3 lg:row-end-1">
                    <div className="lg:flex lg:items-start">
                        <div className="lg:order-2 lg:ml-5">
                            <div className="max-w-xl overflow-hidden rounded-lg">
                                <img
                                    className="h-full w-full max-w-full object-cover"
                                    src={thumbnail}
                                    alt={nama}
                                />
                            </div>
                        </div>

                        <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                            <div className="flex flex-row items-start lg:flex-col">
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                    <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">{nama}</h1>
                    <ProductReviewStar averageRating={destinasiWisata} />

                    <h2 className="mt-8 text-base text-gray-900">Provinsi</h2>
                    <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                        <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                            {provinsi}
                        </p>
                    </div>

                    <h2 className="mt-8 text-base text-gray-900">Category</h2>
                    <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                        <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
                            {categoryWisata}
                        </p>
                    </div>
                    <ul className="mt-8 space-y-2">
                        <li className="flex items-center text-left text-sm font-medium text-gray-600">

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-door mr-2 block h-5 w-5 align-middle text-gray-500" viewBox="0 0 16 16">
                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                            </svg>
                            {alamat}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default DestinasiDetail