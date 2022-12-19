import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from 'services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Images } from './Gallery/ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

function smoothScroll() {
  const cardHeight = document
    .querySelector('ul')
    .firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalHits: 0,
    error: false,
    isLoading: false,
    visibleButton: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, images, totalHits, visibleButton } = this.state;

    if (prevState.query !== query) {
      this.setState(prev => ({
        ...prev,
        images: [],
        page: 1,
        query,
      }));
    }

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const images = await API.getImages(query, page);

        if (images.hits.length === 0) {
          this.setState({ visibleButton: false, isLoading: false });
          toast.error('Nothing was found for your request 😥', {
            autoClose: 3000,
          });
        } else {
          this.setState(
            state => ({
              images: [...state.images, ...images.hits],
              isLoading: false,
              totalHits: images.totalHits,
            }),
            () => {
              if (page !== 1) {
                smoothScroll();
              }
            }
          );
        }
      } catch (error) {
        this.setState({ error: true, isLoading: false });
        console.log(error);
      }
    }

    if (images.length < totalHits && images.length !== 0 && !visibleButton) {
      this.setState({ visibleButton: true });
    } else if (images.length >= totalHits && visibleButton) {
      this.setState({ visibleButton: false });
    }
  }

  onClickBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit = ({ query }) => {
    this.setState({ query, page: 1 });
  };

  render() {
    const { images, visibleButton, isLoading } = this.state;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length !== 0 && <Images images={images} />}
        {isLoading && <Loader />}
        {visibleButton && <Button onClick={this.onClickBtn} />}
        <ToastContainer />
      </div>
    );
  }
}
