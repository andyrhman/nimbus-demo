import React from 'react';
import PropTypes from 'prop-types';

const Star = ({ filled }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={filled ? 'gold' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17.75l-6.978 3.668 1.334-7.782L2 8.586l7.814-1.136L12 1.25l2.186 6.2L22 8.586l-4.356 4.05 1.334 7.782z"
        />
    </svg>
);

const StarRating = ({ rating, totalStars }) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {/* Render filled stars */}
            {Array.from({ length: filledStars }).map((_, index) => (
                <Star key={`filled-${index}`} filled={true} />
            ))}

            {/* Render half star */}
            {hasHalfStar && (
                <Star filled={false} />
            )}

            {/* Render empty stars */}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <Star key={`empty-${index}`} filled={false} />
            ))}
        </div>
    );
};

StarRating.propTypes = {
    rating: PropTypes.number.isRequired, // Current rating (e.g., 4.3)
    totalStars: PropTypes.number, // Total number of stars
};

StarRating.defaultProps = {
    totalStars: 5,
};

export default StarRating;
