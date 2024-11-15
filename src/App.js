// App.js
import React, { useState } from 'react';
import URLShortener from './components/URLShortner';
import URLDisplay from './components/URLDisplay';
import Redirector from './components/Redirector';
import { Container, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [shortenedURL, setShortenedURL] = useState('');

  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          p={4}
          boxShadow={3}
          borderRadius={2}
          bgcolor="background.paper"
          sx={{
            mt: 4,
            bgcolor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <URLShortener setShortenedURL={setShortenedURL} />
                  {shortenedURL && <URLDisplay shortenedURL={shortenedURL} />}
                </>
              }
            />
            <Route path="/:shortenedURL" element={<Redirector />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        </Box>
      </Container>
    </Router>
  );
}

export default App;
