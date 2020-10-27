import React from 'react';
import Icon from '../Icon';
import Footer from './index';

export default {
  title: 'Components/Footer',
  component: Footer,
};
const linkStyle = {
  background: 'white',
  height: '40px',
  width: '40px',
  borderRadius: '50%',
  boxSizing: 'border-box',
  paddingTop: '12px',
  paddingLeft: '12px',
  marginLeft: '14px',
  
};

export const Story1 = (args) =>
  <div style={{ height: '150vh' }}>

    <Footer {...args}
      logo={<img width="100%" src="/images/footer.png" />}
      socialLinks={(
        <>
          <Icon style={linkStyle} color="gray_1" icon="facebook2" />
          <Icon style={linkStyle} color="gray_1" icon="twitter1" />
          <Icon style={linkStyle} color="gray_1" icon="youtube" />
        </>
      )}
    >
      <a style={{ color: 'inherit'}} className="link">Home</a>
      <a style={{ color: 'inherit'}} className="link">Terms of use</a>
      <a style={{ color: 'inherit'}} className="link">Privacy policy</a>
    </Footer>
  </div>;
Story1.storyName = 'Basic';
Story1.args = {
  element: 'div'
}
Story1.argTypes = {
  className: { control: { disable: true } },
  children: { control: { disable: true } },
}