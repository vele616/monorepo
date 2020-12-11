import { useState, useEffect } from "react";
import {
  desktop,
  tabletPortrait,
  mobile,
  viewportLimit,
} from "../styles/main.module.scss";

const myHooks = {};

/**
 * Custom hook for screen-size detection in components.
 */
function useDevice(mobileLimit, tabletLimit, desktopLimit, largeDesktopLimit) {
  const [viewport, setViewport] = useState({
    isMobile: false,
    isDesktop: false,
    isTablet: false,
    isLargeDesktop: false,
  });

  useEffect(() => {
    const isMobile = () =>
      window.innerWidth < tabletLimit && window.innerWidth >= mobileLimit;
    const isTablet = () =>
      window.innerWidth >= tabletLimit && window.innerWidth < desktopLimit;
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
    window.addEventListener("resize", resizeHanlder);
    return () => window.removeEventListener("resize", resizeHanlder);
  }, [desktopLimit, largeDesktopLimit, mobileLimit, tabletLimit]);

  return viewport;
}

export default function memoizedHook(custom) {
  const mobileLimit =
    (custom && custom.mobile) || Number(mobile.replace("px", ""));
  const tabletLimit =
    (custom && custom.tablet) || Number(tabletPortrait.replace("px", ""));
  const desktopLimit =
    (custom && custom.desktop) || Number(desktop.replace("px", ""));
  const largeDesktopLimit =
    (custom && custom.largeDesktop) || Number(viewportLimit.replace("px", ""));

  const deviceKey = `${mobileLimit}, ${tabletLimit}, ${desktopLimit}, ${largeDesktopLimit}`;
  if (!myHooks[deviceKey]) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    myHooks[deviceKey] = useDevice(
      mobileLimit,
      tabletLimit,
      desktopLimit,
      largeDesktopLimit
    );
  }
  return myHooks[deviceKey];
}
