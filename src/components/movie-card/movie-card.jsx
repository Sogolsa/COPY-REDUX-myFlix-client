import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '/src/redux/actions/actions';

// removed user, setUser, token from props
export const MovieCard = ({ movie, token, user, setUser }) => {
  const favorites = useSelector((state) => state.favorites);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  console.log('stored user: ', storedUser);
  const storedToken = localStorage.getItem('token');
  const [isFavorite, setIsFavorite] = useState(false);
  // const [favoriteMovies, setFavoriteMovies] = useState([]);

  const dispatch = useDispatch();

  // removed user, setUser, token from dependencies
  useEffect(() => {
    if (user?.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [movie, token, user, setUser]);

  const addFavoriteMovie = () => {
    if (!storedUser || !storedUser.Name) {
      console.error('User or user.Name is undefined.');
    } else {
      console.log('Name: ', storedUser.Name);
    }
    fetch(
      `https://myfilx-movies-9cb7e129c91a.herokuapp.com/users/${storedUser.Name}/movies/${movie._id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
      }
    )
      .then((response) => {
        console.log('favorite movie: ', response);
        if (response.ok) {
          return response.json();
        } else {
          alert('Failed to add favorite movie');
        }
      })
      .then((updatedUserList) => {
        dispatch(addToFavorites(movie._id));

        console.log('Updated User List:', updatedUserList);
        alert('successfully added to favorites');
        if (updatedUserList) {
          // dispatch(addToFavorites(movie._id));

          localStorage.setItem('user', JSON.stringify(updatedUserList));
          setUser(updatedUserList);
          setIsFavorite(true);
          console.log('FavoriteMovies:', updatedUserList.FavoriteMovies);
          console.log(
            'FavoriteMovies length:',
            updatedUserList.FavoriteMovies.length
          );
        }
      })
      .catch((error) => {
        console.log('User list was not updated', error);
      });
  };

  const removeFavoriteMovie = () => {
    dispatch(removeFromFavorites(movie._id));

    fetch(
      `https://myfilx-movies-9cb7e129c91a.herokuapp.com/users/${storedUser.Name}/movies/${movie._id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new ERROR('Failed to remove from favorite movie');
        }
      })
      .then((updatedUserList) => {
        console.log('Updated User List:', updatedUserList);
        alert('successfully deleted from favorites');
        if (updatedUserList && updatedUserList.FavoriteMovies) {
          localStorage.setItem('user', JSON.stringify(updatedUserList));
          setUser(updatedUserList);
          setIsFavorite(false);
          console.log('User list updated successfully:', updatedUserList);
        }
      })
      .catch((error) => {
        console.log('User list was not updated', error);
        alert('Failed to remove favorite movie');
      });
  };

  const handleToggle = () => {
    if (isFavorite) {
      removeFavoriteMovie();
    } else {
      addFavoriteMovie();
    }
  };

  /* column to look the same using sizing utility class h-100(height: 100%)
  /*encodeURIComponent isn't always needed, the key property used to populate id,
  contains non alphanumeric characters. encodeURIComponent replaces those characters
  with URL friendly characters*/
  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant='link'>More Info</Button>
        </Link>
        <Row>
          <Col>
            <Button variant='link' onClick={handleToggle}>
              {isFavorite ? 'Remove Favorite Movie' : 'Add Favorite Movie'}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imagePath: PropTypes.string,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      bio: PropTypes.string,
      birth: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieCard;
