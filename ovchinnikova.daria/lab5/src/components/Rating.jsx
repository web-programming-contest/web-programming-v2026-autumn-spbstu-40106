import React from 'react';
import {useState, useEffect} from 'react';

export default function Rating({initialRating, votes}) {
  const [userRating, setUserRating] = useState(null);
  const [displayRating, setDisplayRating] = useState(initialRating);

  useEffect(() => {
    if (userRating === null) {
      return;
    }

    setDisplayRating(userRating);

    const timer = setTimeout(() => {
      setUserRating(null);
      setDisplayRating(initialRating);
    }, 3500);

    return () => clearTimeout(timer);
  }, [userRating, initialRating]);

  return (
    <div className="rating">
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            data-testid="rating-star"
            className="rating-star"
            onClick={() => setUserRating(star)}
            aria-label={`Оценка ${star}`}
          >
            ★
          </button>
        ))}
      </div>
      <span data-testid="rating-value" className="rating-value">
        {displayRating.toFixed(1)}
      </span>
      <span className="rating-votes">({votes} голосов)</span>
    </div>
  );
}
