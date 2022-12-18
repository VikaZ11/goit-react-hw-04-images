import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const Images = ({ images }) => {
  return (
    <List>
      {images.map(image => (
        <ImageGalleryItem image={image} key={image.id} />
      ))}
    </List>
  );
};

Images.propTypes = {
  images: PropTypes.array.isRequired,
}
