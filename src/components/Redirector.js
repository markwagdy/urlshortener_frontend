import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { getOriginal } from '../apis';

function Redirector() {
  const { shortenedURL } = useParams();

  useEffect(() => {
    const redirectToOriginalURL = () => {
      if (!shortenedURL) return;
      let redirected = false;
  
      try {
        getOriginal(shortenedURL).then((res)=>{
            if (res?.data?.data?.original_url) {
                let originalURL = res.data.data.original_url;
                redirected = true;
                window.location.replace(originalURL);
              } else {
                console.error("Unable to get original URL from response");
              }
      
        });
              } catch (error) {
        if (!redirected) {
          console.error("Error retrieving original URL:", error);
        }
      }
    };
  
    redirectToOriginalURL();
  }, [shortenedURL]);
  
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" 
    >
      <CircularProgress size={80} />
    </Box>
  );
}

export default Redirector;
