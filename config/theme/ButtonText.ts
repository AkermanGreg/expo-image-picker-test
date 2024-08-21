import { createStyle } from '@gluestack-style/react';

export const ButtonText = createStyle({
  color: '$buttonBlack',
  fontFamily: '$semibold',
  _web: {
    userSelect: 'none',
  },
});
