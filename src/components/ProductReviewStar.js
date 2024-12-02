import React from 'react';
import dynamic from 'next/dynamic';

const StarRatings = dynamic(() => import('react-star-ratings'), { ssr: false });

const ProductReviewStar = ({ averageRating }) => {
    const rating = averageRating?.average_rating ? Number(averageRating.average_rating) : 0;
    const reviewTotal = averageRating?.review_total || 0;

    return (
        <div className="mt-5 flex items-center">
            <div className="flex items-center">
                <StarRatings
                    rating={rating}
                    starDimension="18px"
                    starSpacing="2px"
                    starRatedColor="gold"
                    starEmptyColor="gray"
                    numberOfStars={5}
                    name="rating"
                />
            </div>
            <p className="ml-2 text-sm font-medium text-gray-500">
                {reviewTotal} Reviews
            </p>
        </div>
    );
};

export default ProductReviewStar;