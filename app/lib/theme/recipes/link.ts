import {defineRecipe} from '@chakra-ui/react';

export const uiLinkRecipe = defineRecipe({
  className: 'momentum-link',

  base: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all .2s ease',
    color: 'textSecondary',
    _hover: {
      color: 'text',
      textDecoration: 'none',
    },
  },

  variants: {
    variant: {
      nav: {
        color: 'text',
        transition: '0.2s',
        _hover: {
          color: 'text',
          textDecoration: 'underline',
          textUnderlineOffset: '10px',
        },
      },

      button: {
        color: 'bg',
        fontWeight: 'bold',
        background: 'text.primary',
        p: 2,
        borderRadius: 4,
        _hover: {
          color: 'bg.panel',
          background: '#D8CAC4',
        },
      },

      accent: {
        color: 'textAccent',
      },

      subtle: {
        color: 'textSubtle',
      },
    },

    size: {
      sm: {
        fontSize: 'sm',
      },

      md: {
        fontSize: 'md',
      },

      lg: {
        fontSize: 'lg',
      },
    },
  },

  defaultVariants: {
    variant: 'nav',
    size: 'lg',
  },
});
