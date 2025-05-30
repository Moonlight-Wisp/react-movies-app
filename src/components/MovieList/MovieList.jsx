import React, { useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import MovieCard from '../MovieCard/MovieCard';
import { motion as Motion } from 'framer-motion';
import './MovieList.css';

const MovieList = ({ movies }) => {
  const [sortBy, setSortBy] = useState('default');

  const getSortedMovies = () => {
    switch (sortBy) {
      case 'rating':
        return [...movies].sort((a, b) => b.rating - a.rating);
      case 'title':
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return movies;
    }
  };

  if (!movies.length) {
    return (
      <Container>
        <Alert variant="info" className="text-center my-5">
          Aucun film ne correspond à votre recherche.
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="movie-list-container py-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h2 className="movies-count">
            {movies.length} {movies.length > 1 ? 'Films' : 'Film'}
          </h2>
          <select 
            className="form-select sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Tri par défaut</option>
            <option value="rating">Meilleure note</option>
            <option value="title">Ordre alphabétique</option>
          </select>
        </Col>
      </Row>
      <Row className="g-4">
        {getSortedMovies().map((movie, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index}>
            <Motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <MovieCard movie={movie} />
            </Motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;