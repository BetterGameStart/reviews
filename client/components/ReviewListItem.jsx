import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';

import ReviewBadge from './ReviewBadge';
import ReviewHeader from './ReviewHeader';
import ReviewHelpful from './ReviewHelpful';
import ReviewOwned from './ReviewOwned';
import ReviewRatings from './ReviewRatings';
import ReviewRecommend from './ReviewRecommend';
import ReviewText from './ReviewText';

const Container = styled.div`
display: grid;

grid-template-columns: 60px auto 160px;
grid-template-areas:
  "avatar     header     badge"
  "review     review     review"
  "owned      owned      owned"
  "recommend  recommend  recommend"
  "ratings    ratings    ratings"
  "helpful    helpful    helpful";

@media (min-width: 768px) {
  grid-template-columns: 60px 7fr 3fr;
  grid-template-areas:
    "avatar header    badge"
    "   .   review    ratings"
    "   .   owned     ratings"
    "   .   recommend ratings"
    "   .   helpful   helpful";
  gap: 0px 10px;
}

padding: 10px 20px 10px 10px;
`;

const Avatar = styled.div`
  grid-area: avatar;
  color: #bbb;
  font-size: 50px;
  justify-self: center;
`;

const Rule = styled.hr`
  border: none;
  border-top: 1px solid;
  border-color: #d9d9d9;
`;


const ReviewListItem = (props) => {
  const { review, endpoint, redraw } = props;

  return (
    <>
      <Rule />
      <Container>
        <Avatar><FontAwesomeIcon icon={faUserAlt} /></Avatar>
        <ReviewHeader review={review} />
        <ReviewBadge badge={review.purchaseOnline} />
        <ReviewText review={review.review} />
        <ReviewOwned owned={review.ownershipBracket} />
        <ReviewRecommend recommend={review.recommend} />
        <ReviewRatings review={review} />
        <ReviewHelpful
          yes={review.helpful}
          no={review.unhelpful}
          id={review.id}
          endpoint={endpoint}
          redraw={redraw}
        />
      </Container>
    </>
  );
};

export default ReviewListItem;

ReviewListItem.propTypes = {
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
  endpoint: PropTypes.string.isRequired,
  redraw: PropTypes.func.isRequired,
};
