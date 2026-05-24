import {createSystem, defaultConfig, defineConfig} from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        bg: {
          canvas: {
            value: '#101013ff',
          },

          panel: {
            value: '#0e0e12',
          },

          elevated: {
            value: '#33333fff',
          },

          card: {
            value: '#16161A',
          },

          cardHover: {
            value: '#1D1D22',
          },
        },

        text: {
          primary: {
            value: '#edc0a9ff',
          },

          secondary: {
            value: '#D8CAC4',
          },

          blue: {
            value: '#4d81e9ff',
          },

          tertiary: {
            value: '#AEA19B',
          },

          muted: {
            value: '#ffffff82',
          },

          subtle: {
            value: '#54504E',
          },

          accent: {
            value: '#e9cbc2ff',
          },

          darker: {
            value: '#e9cbc208',
          },
        },
      },
    },

    semanticTokens: {
      colors: {
        bg: {
          value: '{colors.bg.canvas}',
        },

        bgPannel: {
          value: '{colors.bg.canvas}',
        },

        panel: {
          value: '{colors.bg.panel}',
        },

        card: {
          value: '{colors.bg.card}',
        },

        cardHover: {
          value: '{colors.bg.cardHover}',
        },

        elevated: {
          value: '{colors.bg.elevated}',
        },

        text: {
          value: '{colors.text.primary}',
        },

        textSecondary: {
          value: '{colors.text.secondary}',
        },

        textTertiary: {
          value: '{colors.text.tertiary}',
        },

        textMuted: {
          value: '{colors.text.muted}',
        },

        textSubtle: {
          value: '{colors.text.subtle}',
        },

        textAccent: {
          value: '{colors.text.accent}',
        },

        accent: {
          value: '{colors.text.accent}',
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
