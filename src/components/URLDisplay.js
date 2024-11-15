import React, { useEffect, useState } from 'react';
import { Typography, Box, Link, CircularProgress, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getStats } from '../apis';

function URLDisplay({ shortenedURL }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      if (shortenedURL) {
        setLoading(true);
        setError(null);
        try {
          const res = await getStats(shortenedURL);
          if (res?.data?.data) {
            setStats(res.data.data);
          } else {
            setError('Unable to fetch stats.');
          }
        } catch (err) {
          console.error('Error fetching URL stats:', err);
          setError('Failed to load stats.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStats();
  }, [shortenedURL]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortenedURL}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
      })
      .catch(err => console.error('Failed to copy URL:', err));
  };

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h6" color="primary" gutterBottom>
        Your Shortened URL:
      </Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link
          href={`/${shortenedURL}`}
          variant="body1"
          color="secondary"
          underline="hover"
          sx={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            mr: 1
          }}
        >
          {window.location.origin}/{shortenedURL}
        </Link>
        <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
          <IconButton onClick={handleCopy} color="primary">
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>
      {loading ? (
        <CircularProgress size={24} sx={{ mt: 2 }} />
      ) : error ? (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      ) : stats && (
        <Box mt={2}>
          <Typography variant="body1" fontWeight="500" color="textSecondary">
            Clicks: {stats.clicks}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default URLDisplay;
