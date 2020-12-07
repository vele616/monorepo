import React, { useCallback, useRef, useMemo } from "react";
import Typography from "../../components/Typography";
import Navigation from "../../components/Navigation";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import styles from "./navigation.module.scss";

export default {
  title: "Examples/Navigation",
  parameters: {
    docs: { page: null },
  },
  component: Navigation,
  subcomponents: { Button, Typography },
};

const NavigationItems = ({ handleToggleMenu, scrollDown }) => {
  const handleOnClick = useCallback(() => {
    scrollDown();
    handleToggleMenu();
  }, [handleToggleMenu, scrollDown]);

  return (
    <>
      <Typography>One link</Typography>
      <Typography>Two link</Typography>
      <Button onClick={handleOnClick} variant="secondary">
        Scroll down
      </Button>
    </>
  );
};

const Template = () => {
  const footerRef = useRef();

  const scrollDown = useCallback(() => {
    footerRef.current.scrollIntoView();
  }, [footerRef]);

  const navigationItems = useMemo(() => {
    return (toggleMenu) => (
      <NavigationItems handleToggleMenu={toggleMenu} scrollDown={scrollDown} />
    );
  }, [scrollDown]);

  return (
    <div className={styles.container}>
      <Navigation
        Logo={<img alt="logo" width="100%" src="/images/navigation.png" />}
      >
        {navigationItems}
      </Navigation>

      <Footer
        className={styles.footer}
        logo={<img alt="kroki" src="/images/footer.png" />}
      >
        <div ref={footerRef}>
          <span>One</span>
          <span>Two</span>
          <span>Three</span>
        </div>
      </Footer>
    </div>
  );
};

export const Story1 = Template.bind({});
Story1.storyName = "Desktop";
Story1.args = {};
