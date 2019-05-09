import PropTypes from 'prop-types';

export const categoryType = PropTypes.shape ({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

export const cheeseType = PropTypes.shape ({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: categoryType.isRequired,
  rating: PropTypes.number.isRequired,
});

export const menuType = PropTypes.shape ({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cheeses: PropTypes.arrayOf (cheeseType),
});
