import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Card = (props) => {
  console.log('data frm card  :', props.props);
  return (
    <div>
      <a
        href={props.props.url}
        target='_blank'
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <div className='CardComponent'>
          <div className='CardComponentImage'>
            <img src={props.props.urlToImage} />
          </div>
          <div className='CardComponentTitle'>
            <p>
              <strong>Author:</strong> {props.props.author}
            </p>
            <p>
              <strong>Date:</strong> {props.props.publishedAt}
            </p>
            <strong>{props.props.title}</strong>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
