import { useState, useEffect } from 'react';
import { desktop, tablet, mobile, largeDesktop } from '../styles/main.module.scss';

const isMobile = () => window.innerWidth < tablet && window.innerWidth >= mobile - 2;
const isTablet = () => window.innerWidth >= tablet && window.innerWidth < desktop;
const isDesktop = () => window.innerWidth >= desktop;
const isLargeDesktop = () => window.innerWidth > largeDesktop;

/**
 * Custom hook for screen-size detection in components.
 */
export default function useDevice() {
  const [viewport, setViewport] = useState({
    isMobile: false,
    isDesktop: false,
    isTablet: false,
    isLargeDesktop: false,
  });

  useEffect(() => {
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