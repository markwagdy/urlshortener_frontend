import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { postShorten } from '../apis';
import { toast } from 'react-toastify';

function URLShortener({ setShortenedURL }) {
  const [originalURL, setOriginalURL] = useState('');

  const handleShortenURL = async () => {
    try {
      const response = await postShorten({ original_url: originalURL });
      if (response?.data?.data?.shortened_url) {
        setShortenedURL(response.data.data.shortened_url);
      } else {
        console.log('Unable to post shortened URL');
      }
    } catch (error) {
      console.log(error['original_url']);
      toast.error(error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={2} width="100%">
      <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
        URL Shortener
      </Typography>
      <TextField
        label="Enter original URL"
        variant="outlined"
        fullWidth
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
        sx={{
          bgcolor: 'white',
          borderRadius: '5px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleShortenURL}
        sx={{
          width: '100%',
          bgcolor: '#1976d2',
          '&:hover': {
            bgcolor: '#1565c0',
          },
        }}
      >
        Shorten URL
      </Button>
    </Box>
  );
}

export default URLShortener;
