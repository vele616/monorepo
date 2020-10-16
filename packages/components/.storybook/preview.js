import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import viewports from '../src/styles/main.module.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {
      desktopLarge: {
        name: 'Desktop - large',
        styles: {
          width: `${viewports.largeDesktop}px`,
          height: '1000px',
        },
        type: 'desktop'
      },
      desktop: {
        name: 'Desktop',
        styles: {
          width: `${viewports.desktop}px`,
          height: '800px',
        },
        type: 'desktop'
      },
      tabletLarge: {
        name: 'Tablet - maximum',
        styles: {
          width: `${viewports.desktop - 1}px`,
          height: '960px',
        },
        type: 'tablet',
      },
      mobileLarge: {
        name: 'Mobile - maximum',
        styles: {
          height: '896px',
          width: `${viewports.tablet - 1}px`,
        },
        type: 'mobile',
      },
      mobileSmall: {
        name: 'Mobile - minimum',
        styles: {
          height: '568px',
          width:  `${viewports.mobile - 1}px`,
        },
        type: 'mobile',
      },
      ...INITIAL_VIEWPORTS,
    },
  }
}