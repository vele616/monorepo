import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import viewports from '../src/styles/main.module.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {
      desktopLarge: {
        name: 'Desktop - maximum',
        styles: {
          width: viewports.viewportLimit,
          height: '1000px',
        },
        type: 'desktop'
      },
      desktopAvg: {
        name: 'Desktop - average',
        styles: {
          width: '1920px',
          height: '1080px',
        },
        type: 'desktop'
      },
      desktop: {
        name: 'Desktop - minimum',
        styles: {
          width: viewports.desktop,
          height: '800px',
        },
        type: 'desktop'
      },
      tabletLandscapeMinimum: {
        name: 'Tablet Landscape - minimum',
        styles: {
          width: viewports.tabletLandscape,
          height: '960px',
        },
        type: 'tablet',
      },
      tabletPortraitMinimum: {
        name: 'Tablet portrait - minimum',
        styles: {
          height: '896px',
          width: viewports.tabletPortrait,
        },
        type: 'mobile',
      },
      mobileMinimum: {
        name: 'Mobile - minimum',
        styles: {
          height: '568px',
          width: viewports.mobile,
        },
        type: 'mobile',
      },
      ...INITIAL_VIEWPORTS,
    },
  }
}