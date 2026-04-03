import React from 'react';
import PropTypes from 'prop-types';
import { Button as ChakraButton } from '@chakra-ui/react';

export const Button = ({ variant, size, label, onClick, disabled, colorPalette, ...props }) => {
  return (
    <ChakraButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
      colorPalette={colorPalette}
      {...props}
    >
      {label}
    </ChakraButton>
  );
};

Button.propTypes = {
  /**
   * The visual style of the button (Chakra variants)
   */
  variant: PropTypes.oneOf(['solid', 'outline', 'ghost', 'subtle', 'surface']),
  /**
   * Chakra color palette (e.g. blue, red, green)
   */
  colorPalette: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Is the button disabled?
   */
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  variant: 'solid',
  colorPalette: 'blue',
  size: 'md',
  onClick: undefined,
  disabled: false,
};
