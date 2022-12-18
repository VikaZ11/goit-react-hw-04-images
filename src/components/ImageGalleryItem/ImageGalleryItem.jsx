import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL} = this.props.image;
    const { showModal } = this.state;
    return (
      <Item>
        <Img src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            imageUrl={largeImageURL}
            imageTags={tags}
          />
        )}
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
}
