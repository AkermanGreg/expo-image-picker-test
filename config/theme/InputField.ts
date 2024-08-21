import { createStyle } from '@gluestack-style/react';

export const InputField = createStyle({
  flex: 1,
  color: '$white',
  fontFamily: '$regular',
  py: "$2.5",
  px: "$4",
  props: {
    placeholderTextColor: '$placeholder',
  },
  _dark: {
    color: '$textDark50',
    props: {
      placeholderTextColor: '$textDark400',
    },
  },
  _web: {
    'cursor': 'text',
    ':disabled': {
      cursor: 'not-allowed',
    },
  },
  variants: {
    size: {
      '2xs': {
        fontSize: '$2xs',
      },
      'xs': {
        fontSize: '$xs',
      },

      'sm': {
        fontSize: '$sm',
      },

      'md': {
        fontFamily: '$regular',
        fontSize: '$md',
        lineHeight: '$lg',
      },

      'lg': {
        fontSize: '$lg',
      },

      'xl': {
        fontSize: '$xl',
      },

      '2xl': {
        fontSize: '$2xl',
      },

      '3xl': {
        fontSize: '$3xl',
      },

      '4xl': {
        fontSize: '$4xl',
      },

      '5xl': {
        fontSize: '$5xl',
      },

      '6xl': {
        fontSize: '$6xl',
      },
    },
  },
});
