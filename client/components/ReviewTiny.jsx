import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReviewHeader from './ReviewHeader';

const Title = styled.h3`
  font-size: 14;
  font-weight: 700;
  height: auto;
  margin: 0;
  margin-bottom: 24px;
`;

const Text = styled.div`
  font-size: 16px;
  width: 90%;
  margin-bottom: 24px;
`;

const ReviewTiny = (props) => {
  const { review, title } = props;

  return (
    <div>
      <Title>
        {`Most Helpful ${title} Review`}
      </Title>
      <ReviewHeader review={review} />
      <Text>
        {review.review.substring(0, 100)}
        ...
      </Text>
      <Text>
        {`${review.helpful} of ${review.helpful + review.unhelpful} people found this helpful`}
      </Text>
    </div>
  );
};

export default ReviewTiny;

ReviewTiny.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string,
    gameId: PropTypes.number,
    date: PropTypes.string,
    overall: PropTypes.number,
    title: PropTypes.string,
    review: PropTypes.string,
    recommend: PropTypes.bool,
    nickname: PropTypes.string,
    location: PropTypes.string,
    email: PropTypes.string,
    buyForSelf: PropTypes.bool,
    ageBracket: PropTypes.number,
    gender: PropTypes.number,
    graphics: PropTypes.number,
    gameplay: PropTypes.number,
    appeal: PropTypes.number,
    ownershipBracket: PropTypes.number,
    purchaseOnline: PropTypes.bool,
    readReviews: PropTypes.bool,
    recommendBGS: PropTypes.number,
    helpful: PropTypes.number,
    unhelpful: PropTypes.number,
  }).isRequired,
  title: PropTypes.string.isRequired,
};
