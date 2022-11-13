import { fetchPic, lastPage } from './js/fetchapi-pixabay';
import { renderCard } from './js/render-image';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { scrollLoad } from './js/scroll';
import SimpleLightbox from 'simplelightbox';

const formSearch = document.querySelector('#search-form input');
const btnSearch = document.querySelector('.btn-search');
const btnLoadMore = document.querySelector('.btn-load');
const gallery = document.querySelector('.gallery');

btnLoadMore.style.display = 'none';
let lightbox;
let valueSearch = '';
let numPage;
const perPage = 40;

const findPicture = () => {
  event.preventDefault();

  btnLoadMore.style.display = 'none';
  valueSearch = formSearch.value.trim();

  fetchPic(valueSearch, numPage, perPage)
    .then(image => {
      Loading.circle();
      renderCard(image.hits);

      if (numPage !== 1) {
        scrollLoad(2.45);
      }
      lightbox = new SimpleLightbox('.gallery a').refresh();

      btnLoadMore.style.display = 'block';

      console.log(numPage);

      const totalPages = Math.ceil(image.totalHits / perPage);

      if (numPage === totalPages) {
        btnLoadMore.style.display = 'none';
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
      console.log(totalPages);
    })
    .catch(error => console.error(error))
    .finally(() => {
      Loading.remove();
    });
};

function loadMore() {
  numPage += 1;
  lightbox.destroy();
  findPicture();
}

btnSearch.addEventListener('click', () => {
  event.preventDefault();
  valueSearch = formSearch.value;
  if (valueSearch === '') {
    Notify.failure(
      'The search field cannot be empty. Please refine your search.'
    );
    return;
  } else {
    numPage = 1;
    gallery.innerHTML = '';
    findPicture();
  }
});

btnLoadMore.addEventListener('click', loadMore);