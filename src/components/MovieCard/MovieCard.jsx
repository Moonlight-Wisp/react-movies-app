import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Card
      className="movie-card h-100 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/movie/${encodeURIComponent(movie.title)}`)}
    >
      <div className="movie-image-container">
        <Card.Img
          variant="top"
          src={movie.posterURL}
          alt={movie.title}
          className="movie-image"
        />
        <div className={`movie-overlay ${isHovered ? 'visible' : ''}`}>
          <p className="movie-description">{movie.description}</p>
        </div>
        <button
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
        >
          <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeart} />
        </button>
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="movie-title">{movie.title}</Card.Title>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{`Note: ${movie.rating}/5`}</Tooltip>}
          >
            <Badge bg="warning" text="dark" className="rating-badge">
              <FontAwesomeIcon icon={faStar} className="me-1" />
              {movie.rating}
            </Badge>
          </OverlayTrigger>
        </div>

        <div className="rating-stars">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={index < movie.rating ? 'star-filled' : 'star-empty'}
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
