import React from 'react';
import Grid from '../../components/Grid';
import Typography from '../../components/Typography';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Input from '../../components/Input';
import styles from './contactform_v2.module.scss';

export default {
  title: 'Examples/Page Bottom/Contact Form v2',
  parameters: {
    docs: { page: null },
  },
  component: Grid,
  subcomponents: { Button, Grid, Typography, Input },
  parameters: {
    docs: { page: null },
  },
};

const Tempate = () => (
  <>
    <div className={styles.wrapper}>
      <Grid alignItems="end" className={styles.grid}>
        <img className={styles.image} src="/images/crocFriends.png" />
        <div  className={styles.text} >
          <Typography color="gray_2" element="div" className={styles.title}  fontWeight={700} fontSize={44}>
            Contact <Typography fontWeight={700} color="green_2">Cro</Typography>Coder
          </Typography>
          <Typography color="gray_6" element="div"  className={styles.subtitle} fontSize={20}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </div>
        <Input className={styles.email} required label="E-mail" />
        <Input className={styles.name} required label="Your name" />
        <Input className={styles.message} required label="Message" />
        <Button className={styles.button}> Submit</Button>
      </Grid>
    </div>
    <Footer
      logo={<img width="100%" src="/images/footer.png" />}
      socialLinks={(
        <>
          <Icon style={linkStyle} color="gray_1" icon="facebook2" />
          <Icon style={linkStyle} color="gray_1" icon="twitter1" />
          <Icon style={linkStyle} color="gray_1" icon="youtube" />
        </>
      )}
    >
      <a style={{ color: 'inherit' }} className="link">Home</a>
      <a style={{ color: 'inherit' }} className="link">Terms of use</a>
      <a style={{ color: 'inherit' }} className="link">Privacy policy</a>
    </Footer>
  </>
);

export const Story1 = Tempate.bind({});
Story1.storyName = 'Basic usage (desktop)';
Story1.args = {
  label: "banana",
}
Story1.argTypes = {
  className: { control: { disable: true } },
}



export const Story2 = Tempate.bind({});
Story2.storyName = 'Tablet';
Story2.args = {
  label: "banana",
}
Story2.parameters = {
  viewport: {
    defaultViewport: 'tabletLarge'
  }
}
Story2.argTypes = {
  className: { control: { disable: true } },
}



export const Story3 = Tempate.bind({});
Story3.storyName = 'Mobile (large)';
Story3.args = {
  label: "banana",
}
Story3.parameters = {
  viewport: {
    defaultViewport: 'mobileLarge'
  }
}
Story3.argTypes = {
  className: { control: { disable: true } },
}




export const Story4 = Tempate.bind({});
Story4.storyName = 'Mobile (small)';
Story4.args = {
  label: "banana",
}
Story4.parameters = {
  viewport: {
    defaultViewport: 'mobileSmall'
  }
}
Story4.argTypes = {
  className: { control: { disable: true } },
}


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