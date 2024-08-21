import { createStyle } from '@gluestack-style/react';

export const FormControlErrorText = createStyle({
  color: '$error700',
  fontSize: '$sm',
  lineHeight: '$sm',
  fontFamily: '$regular',
  _dark: {
    color: '$error400',
  },
});
