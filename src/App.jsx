import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Filter from './components/Filter/Filter';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './pages/MovieDetails';

const App = () => {
  const [movies, setMovies] = useState([
    {
      title: "Inception",
      description: "Un voleur qui s'infiltre dans les rêves.",
      posterURL: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      rating: 5
    },
    {
      title: "The Dark Knight",
      description: "Batman affronte le Joker.",
      posterURL: "https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
      rating: 4
    }
  ]);

  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: 1,
  });

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!newMovie.title || !newMovie.description || !newMovie.posterURL || !newMovie.rating) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    setMovies([...movies, newMovie]);
    setNewMovie({ title: '', description: '', posterURL: '', rating: 1 });
    setShowAddForm(false);
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesTitle = movie.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesRating = !ratingFilter || movie.rating >= parseInt(ratingFilter);
    return matchesTitle && matchesRating;
  });

  return (
    <Router>
      <Container fluid className="app-container py-4 bg-light min-vh-100">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-center mb-4 text-primary fw-bold">🎬 Ma Collection de Films</h1>
        </motion.div>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Filter
                  onTitleChange={setTitleFilter}
                  onRatingChange={setRatingFilter}
                />

                <Row className="justify-content-center mb-4">
                  <Col xs={12} md={8} lg={6}>
                    <Button
                      variant="primary"
                      className="w-100 add-movie-button shadow-sm"
                      onClick={() => setShowAddForm(!showAddForm)}
                    >
                      {showAddForm ? 'Fermer le formulaire' : '🎞️ Ajouter un nouveau film'}
                    </Button>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: showAddForm ? 'auto' : 0, opacity: showAddForm ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <Card className="mt-3 shadow-sm">
                        <Card.Body>
                          <Form onSubmit={handleAddMovie}>
                            <Form.Group className="mb-3">
                              <Form.Label>Titre</Form.Label>
                              <Form.Control
                                type="text"
                                value={newMovie.title}
                                onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                                placeholder="Saisissez le titre du film"
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                value={newMovie.description}
                                onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                                placeholder="Décrivez le film en quelques mots"
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>URL de l'affiche</Form.Label>
                              <Form.Control
                                type="text"
                                value={newMovie.posterURL}
                                onChange={(e) => setNewMovie({ ...newMovie, posterURL: e.target.value })}
                                placeholder="Collez l'URL de l'image du film"
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Note</Form.Label>
                              <Form.Control
                                type="number"
                                min="1"
                                max="5"
                                value={newMovie.rating}
                                onChange={(e) => setNewMovie({ ...newMovie, rating: parseInt(e.target.value) })}
                              />
                            </Form.Group>

                            <Button variant="success" type="submit" className="w-100">
                              ✅ Ajouter le film
                            </Button>
                          </Form>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                </Row>

                <MovieList movies={filteredMovies} />
              </>
            }
          />

          <Route path="/movie/:title" element={<MovieDetails movies={movies} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
