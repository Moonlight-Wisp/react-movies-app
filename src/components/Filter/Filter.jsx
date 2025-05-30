import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faSliders } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import './Filter.css';

const Filter = ({ onTitleChange, onRatingChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [rating, setRating] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Debounce pour la recherche
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onTitleChange(searchValue);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchValue, onTitleChange]);

  const handleRatingChange = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <Container className="filter-container my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="filter-wrapper">
            <InputGroup className="mb-3 shadow-sm">
              <InputGroup.Text className="bg-white border-end-0">
                <FontAwesomeIcon icon={faSearch} className="text-primary" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Rechercher un film..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="border-start-0 search-input"
              />
              <InputGroup.Text 
                className="bg-white border-start-0 cursor-pointer"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <FontAwesomeIcon icon={faSliders} className="text-primary" />
              </InputGroup.Text>
            </InputGroup>

            <CSSTransition
              in={showAdvanced}
              timeout={300}
              classNames="filter-advanced"
              unmountOnExit
            >
              <div className="advanced-filters p-3 bg-white rounded shadow-sm">
                <Form.Label className="mb-2 d-flex align-items-center">
                  <FontAwesomeIcon icon={faStar} className="text-warning me-2" />
                  Note minimale
                </Form.Label>
                <div className="rating-buttons d-flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      className={`btn ${
                        rating === num.toString()
                          ? 'btn-primary'
                          : 'btn-outline-primary'
                      }`}
                      onClick={() => handleRatingChange(num.toString())}
                    >
                      {num} <FontAwesomeIcon icon={faStar} />
                    </button>
                  ))}
                  <button
                    className={`btn ${
                      !rating ? 'btn-primary' : 'btn-outline-primary'
                    }`}
                    onClick={() => handleRatingChange('')}
                  >
                    Tous
                  </button>
                </div>
              </div>
            </CSSTransition>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Filter;