import React from 'react';
import PropTypes from 'prop-types';
import StarRating from './Star.js';

const ProductReviewStar = ({ average_rating, review_total }) => {
    const rating = average_rating ? Number(average_rating) : 0;
    const reviewTotal = review_total || 0;

    return (
        <div className="mt-5 flex items-center">
            <StarRating rating={rating} />
            <p className="ml-2 text-sm font-medium text-gray-500">
                {reviewTotal} Reviews
            </p>
        </div>
    );
};

ProductReviewStar.propTypes = {
    average_rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    review_total: PropTypes.number,
};

export default ProductReviewStar;
