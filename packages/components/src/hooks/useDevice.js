import { useState, useEffect } from 'react';
import { desktop, tablet, mobile, largeDesktop } from '../styles/main.module.scss';



/**
 * Custom hook for screen-size detection in components.
 */
export default function useDevice(custom) {
  const mobileLimit = (custom && custom.mobile) || mobile;
  const tabletLimit = (custom && custom.tablet) || tablet;
  const desktopLimit = (custom && custom.desktop) || desktop;
  const largeDesktopLimit = (custom && custom.largeDesktop) || largeDesktop;

  const [viewport, setViewport] = useState({
    isMobile: false,
    isDesktop: false,
    isTablet: false,
    isLargeDesktop: false,
  });

  useEffect(() => {
    const isMobile = () => window.innerWidth < tabletLimit && window.innerWidth >= mobileLimit - 2;
    const isTablet = () => window.innerWidth >= tabletLimit && window.innerWidth < desktopLimit;
    const isDesktop = () => window.innerWidth >= desktopLimit;
    const isLargeDesktop = () => window.innerWidth > largeDesktopLimit;

    setViewport({
      isMobile: isMobile(),
      isTablet: isTablet(),
      isDesktop: isDesktop(),
      isLargeDesktop: isLargeDesktop(),
    });
    const resizeHanlder = () => {
      setViewport({
        isMobile: isMobile(),
        isTablet: isTablet(),
        isDesktop: isDesktop(),
        isLargeDesktop: isLargeDesktop(),
      });
    };
    window.addEventListener('resize', resizeHanlder);
    return () => window.removeEventListener('resize', resizeHanlder);
  }, []);

  return viewport;
}