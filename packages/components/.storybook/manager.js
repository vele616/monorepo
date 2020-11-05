
import { addons } from '@storybook/addons';
import { create, themes } from '@storybook/theming/create';


const customTheme = create({
  base: 'light',
  brandTitle: 'CroCoder components',
  brandUrl: 'https://crocoder.dev/',
  brandImage: '/images/navigation.png',

  fontBase: '"Rubik", sans-serif',
  fontCode: 'monospace',

  textColor: '#3C3843',
  textInverseColor: '#FFF',
  appBg: '#F6FCFD',
  appBorderRadius: 6,
  colorPrimary: '#85A32A',
  colorSecondary: '#85A32A',

  barTextColor: '#7D8397'
})

addons.setConfig({
  theme: customTheme,
});