import React from 'react';
import styled from 'styled-components';

import ReviewList from './components/ReviewList';
import ReviewSummary from './components/ReviewSummary';
import FilterBar from './components/FilterBar';

const dummyReview = {
  _id: '0',
  gameId: 0,
  date: `${new Date()}`,
  overall: 1,
  title: '',
  review: '',
  recommend: false,
  nickname: '',
  location: '',
  email: '',
  buyForSelf: false,
  ageBracket: 1,
  gender: 1,
  graphics: 1,
  gameplay: 1,
  appeal: 1,
  ownershipBracket: 1,
  purchaseOnline: false,
  readReviews: false,
  recommendBGS: 1,
  meta: {
    helpful: 1,
    unhelpful: 1,
  },
};

const SectionHeading = styled.h1`
  font-size: 2.25rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const SectionSubHead = styled.h2`
  font-size: 34px;
  font-weight: 400;
  line-height: 35px;
  text-transform: uppercase;
`;

const Rule = styled.hr`
  border: none;
  border-top: 1px solid;
  border-color: #d9d9d9;
`;

const Container = styled.div`
  max-width: 1280px;
  font-family: sans-serif;
  margin: auto;
  padding: 5px;
`;

function mostHelpful(reviews) {
  return reviews.reduce((best, current) => {
    const helpfulness = (review) => (review.helpful
      / (review.helpful + review.unhelpful));

    if (helpfulness(current) > helpfulness(best)) {
      return current;
    }

    return best;
  });
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentGame: 1,
      reviews: [dummyReview],
      mostFavorable: dummyReview,
      mostCritical: dummyReview,
      ratingCounts: [0, 0, 0, 0, 0],
      ratingAverages: [1, 1, 1, 1],
      totalReviews: 0,
      filterMatrix: [
        [false, (review) => (review.overall === 1), '1 STAR'],
        [false, (review) => (review.overall === 2), '2 STARS'],
        [false, (review) => (review.overall === 3), '3 STARS'],
        [false, (review) => (review.overall === 4), '4 STARS'],
        [false, (review) => (review.overall === 5), '5 STARS'],
      ],
      filteredReviews: [dummyReview],
    };

    this.REVIEWSBASE = '/reviews/';
    this.fetchReviews = this.fetchReviews.bind(this);
    this.digestReviews = this.digestReviews.bind(this);
    this.readFilterMatrix = this.readFilterMatrix.bind(this);
    this.filterReviews = this.filterReviews.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.checkFavorable = this.checkFavorable.bind(this);
    this.setFilterMatrix = this.setFilterMatrix.bind(this);
    this.clearFilterMatrix = this.clearFilterMatrix.bind(this);
  }

  componentDidMount() {
    const gameId = window.location.pathname.match(/\/games\/(\d+)/);
    this.fetchReviews(gameId[1]);
  }

  setFilterMatrix(value, index) {
    const { filterMatrix } = this.state;
    const reg = [...filterMatrix];

    if (reg[index][0] === value) {
      return;
    }

    reg[index][0] = value;

    this.setState({ filterMatrix: reg }, this.applyFilter);
  }

  clearFilterMatrix() {
    const { filterMatrix } = this.state;
    const reg = [...filterMatrix];

    for (let i = 0; i < reg.length; i += 1) {
      reg[i][0] = false;
    }

    this.setState({ filterMatrix: reg }, this.applyFilter);
  }

  fetchReviews(currentGame = this.state.currentGame) {
    fetch(`${this.REVIEWSBASE}${currentGame}`)
      .then((response) => { return response.json(); })
      .then((data) => { console.log(data);return this.digestReviews(currentGame, data._rs.rows); })
      .then(() => { this.applyFilter(); })
      .then(() => { this.checkFavorable(); })
      .catch((err) => { console.log(err); });
  }

  digestReviews(currentGame, reviews) {
    let oneStarCount = 0;
    let twoStarCount = 0;
    let threeStarCount = 0;
    let fourStarCount = 0;
    let fiveStarCount = 0;
    let starSum = 0;
    let graphicSum = 0;
    let gameplaySum = 0;
    let appealSum = 0;
    for (let i = 0; i < reviews.length; i += 1) {
      if (reviews[i].overall === 1) {
        oneStarCount += 1;
      } else if (reviews[i].overall === 2) {
        twoStarCount += 1;
      } else if (reviews[i].overall === 3) {
        threeStarCount += 1;
      } else if (reviews[i].overall === 4) {
        fourStarCount += 1;
      } else if (reviews[i].overall === 5) {
        fiveStarCount += 1;
      }

      starSum += reviews[i].overall;
      graphicSum += reviews[i].graphics;
      gameplaySum += reviews[i].gameplay;
      appealSum += reviews[i].appeal;
    }

    this.setState({
      currentGame,
      reviews,
      ratingCounts: [oneStarCount, twoStarCount, threeStarCount, fourStarCount, fiveStarCount],
      ratingAverages: [
        +(starSum / reviews.length).toFixed(2),
        +(graphicSum / reviews.length).toFixed(2),
        +(gameplaySum / reviews.length).toFixed(2),
        +(appealSum / reviews.length).toFixed(2),
      ],
      totalReviews: reviews.length,
    });
  }

  readFilterMatrix() {
    const { filterMatrix } = this.state;
    const results = [];

    for (let i = 0; i < filterMatrix.length; i += 1) {
      if (filterMatrix[i][0]) {
        results.push(filterMatrix[i][1]);
      }
    }

    return results;
  }

  filterReviews(filter = this.readFilterMatrix()) {
    const { reviews } = this.state;

    if (filter.length === 0) {
      return reviews;
    }

    const filtered = [];

    for (let i = 0; i < reviews.length; i += 1) {
      for (let j = 0; j < filter.length; j += 1) {
        if (filter[j](reviews[i])) {
          filtered.push(reviews[i]);
          break;
        }
      }
    }

    return filtered;
  }

  applyFilter() {
    const filtered = this.filterReviews();

    this.setState({
      filteredReviews: filtered,
    });
  }

  checkFavorable() {
    const favorable = mostHelpful(this.filterReviews([
      (review) => (review.overall === 5),
      (review) => (review.overall === 4),
    ]));

    const critical = mostHelpful(this.filterReviews([
      (review) => (review.overall === 3),
      (review) => (review.overall === 2),
      (review) => (review.overall === 1),
    ]));

    this.setState({
      mostFavorable: favorable,
      mostCritical: critical,
    });
  }

  render() {
    const {
      currentGame,
      filteredReviews,
      filterMatrix,
      mostFavorable,
      mostCritical,
      ratingCounts,
      ratingAverages,
      totalReviews,
    } = this.state;

    return (
      <Container>
        <SectionHeading>reviews</SectionHeading>
        <Rule />
        <SectionSubHead>reviews</SectionSubHead>
        <Container>
          <ReviewSummary
            counts={ratingCounts}
            averages={ratingAverages}
            total={totalReviews}
            favorable={mostFavorable}
            unfavorable={mostCritical}
            setter={this.setFilterMatrix}
          />
          <FilterBar
            filterMatrix={filterMatrix}
            setter={this.setFilterMatrix}
            clear={this.clearFilterMatrix}
          />
          <ReviewList
            reviews={filteredReviews}
            endpoint={`${this.REVIEWSBASE}${currentGame}`}
            redraw={this.fetchReviews}
          />
        </Container>
      </Container>
    );
  }
}

export default App;
