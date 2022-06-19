import React from 'react';
import Skeleton from 'react-loading-skeleton';

const CardSkeleton = () => {
  return (
    <div className='card-skeleton'>
      <div className='CardComponent'>
        <div className='CardComponentImage'>
          <Skeleton height={350} />
        </div>
        <div className='CardComponentTitle'>
          <p>
            <Skeleton />
          </p>
          <p>
            <Skeleton />
          </p>
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
