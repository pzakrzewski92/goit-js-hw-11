const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export async function fetchPic(valueSearch, numPage, perPage) {
  try {
    const response = await axios.get(`https://pixabay.com/api/`, {
      method: 'get',
      params: {
        key: '31041731-a505db8ec7b0fe3c02dc109a4',
        q: valueSearch,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page: numPage,
      },
    });

    if (response.data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (response.data.totalHits > 0 && numPage === 1)
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}