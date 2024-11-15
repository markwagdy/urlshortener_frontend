import axios from 'axios';
import { toast } from 'react-toastify';

const HOST = process.env.REACT_APP_API_URL;

export async function getStats(shortenedUrl) {
  try {
    return await axios.get(`${HOST}/api/stats/${shortenedUrl}`);
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred while fetching stats.");
    throw error;
  }
}

export async function postShorten(body) {
  try {
    return await axios.post(`${HOST}/api/shorten`, body);
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred while shortening the URL.");
    throw error;
  }
}

export async function getOriginal(shortenedUrl) {
  try {
    console.log('shortened : ',shortenedUrl)
    return await axios.get(`${HOST}/api/${shortenedUrl}`);
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred while retrieving the original URL.");
    throw error;
  }
}
