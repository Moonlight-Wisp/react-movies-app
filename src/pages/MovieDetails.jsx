import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const MovieDetails = ({ movies }) => {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const movie = movies.find((m) => m.title === decodedTitle);

  if (!movie) {
    return (
      <Container className="text-center py-5">
        <h2>Film introuvable 😢</h2>
        <p>Le film demandé n'existe pas ou a été supprimé.</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md={5}>
          <Card.Img src={movie.posterURL} alt={movie.title} className="rounded shadow-sm" />
        </Col>
        <Col md={7}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <h5>
            Note :
            <Badge bg="warning" text="dark" className="ms-2">
              <FontAwesomeIcon icon={faStar} className="me-1" />
              {movie.rating}/5
            </Badge>
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;