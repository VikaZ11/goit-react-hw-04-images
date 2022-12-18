import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      Load more
    </StyledButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
