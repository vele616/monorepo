import React from 'react';
import Grid from '../components/Grid';
import Icon from '../components/Icon';
import Flexbox from '../components/Flexbox';
import Typography from '../components/Typography';
import Button from '../components/Button';
import Input from '../components/Input';

export default {
  title: 'Examples/Subscribe to CroCoder Jobs',
  parameters: {
    docs: { page: null },
  },
  component: Grid,
  subcomponents: { Button, Grid, Typography, Input },
};



export const Story1 = () => (
  <>
    <Typography
      fontSize={65}
      element="div"
      color="gray_2"
      fontWeight={700}
      style={{ textAlign: "center" }}>
      Subscribe to <Typography
        fontWeight={700} color="green_4">Cro</Typography>Coder Jobs
      <Typography style={{ marginTop: '16px' }} element="div" fontSize={24}>
        Get your daily dose of new job postings.
      </Typography>
    </Typography>
    <Grid
      rows="auto auto"
      columns="repeat(3, minmax(0, 1fr))"
      columnGap="60px"
      style={{ width: '600px', margin: '60px auto 20px auto' }}
    >

      <Input required label="E-mail" style={{ gridColumn: '1 / span 2', gridRow: '1 / span 1' }} />
      <Button style={{ gridColumn: '3 / span 1', gridRow: '1 / span 1' }}> Submit</Button>
      <Flexbox alignItems="baseline" style={{ gridColumn: '1 / span 2', gridRow: '2 / span 1' }}>
        <Icon fontSize={14} color="gray_2" style={{ margin: '0 10px' }} icon="checkbox-unchecked" />
        <Typography fontSize={16} color="gray_2" >A confirmation of terms of services </Typography>
      </Flexbox>
    </Grid>
  </>
);
Story1.storyName = 'Desktop';
Story1.argTypes = {
  className: { control: { disable: true } },
}



export const Story2 = () => (
  <>
    <Typography
      fontSize={65}
      element="div"
      color="gray_2"
      fontWeight={700}
      style={{ textAlign: "center" }}>
      Subscribe to <Typography
        fontWeight={700} color="green_4">Cro</Typography>Coder Jobs
      <Typography style={{ marginTop: '16px' }} element="div" fontSize={24}>
        Get your daily dose of new job postings.
      </Typography>
    </Typography>
    <Grid
      rows="auto auto"
      columns="repeat(3, minmax(0, 1fr))"
      columnGap="60px"
      style={{ width: '600px', margin: '20px auto' }}
    >
      <Input required label="E-mail" style={{ gridColumn: '1 / span 2', gridRow: '1 / span 1' }} />
      <Button style={{ gridColumn: '3 / span 1', gridRow: '1 / span 1' }}> Submit</Button>
      <Flexbox alignItems="baseline" style={{ gridColumn: '1 / span 2', gridRow: '2 / span 1' }}>
        <Icon fontSize={14} color="gray_2" style={{ margin: '0 10px' }} icon="checkbox-unchecked" />
        <Typography fontSize={16} color="gray_2" >A confirmation of terms of services </Typography>
      </Flexbox>
    </Grid>
  </>
);
Story2.storyName = 'Tablet Landscape';
Story2.args = {
  label: "banana",
}
Story2.parameters = {
  viewport: {
    defaultViewport: 'tabletLandscapeMinimum'
  }
}
Story2.argTypes = {
  className: { control: { disable: true } },
}



export const Story3 = () => (
  <>
    <Typography
      fontSize={65}
      element="div"
      color="gray_2"
      fontWeight={700}
      style={{ textAlign: "center", margin: 'auto', maxWidth: '350px' }}>
      Subscribe to <Typography
        fontWeight={700} color="green_4">Cro</Typography>Coder Jobs
    <Typography style={{ marginTop: '16px' }} element="div" fontSize={24}>
        Get your daily dose of new job postings.
    </Typography>
    </Typography>
    <Grid
      rows="auto auto auto auto"
      columns="auto"
      rowGap="5px"
      style={{ width: '90%', margin: '20px auto',  maxWidth: '290px'  }}
    >

      <Input required label="E-mail" style={{ gridColumn: '1 / span 1', gridRow: '1 / span 1' }} />
      <Button style={{ gridColumn: '1 / span 1', gridRow: '3 / span 1' }}> Submit</Button>
      <Flexbox alignItems="baseline" style={{ gridColumn: '1 / span 1', gridRow: '2 / span 1', marginBottom: '10px' }}>
        <Icon fontSize={14} color="gray_2" style={{ margin: '0 10px' }} icon="checkbox-unchecked" />
        <Typography fontSize={16} color="gray_2" >A confirmation of terms of services </Typography>
      </Flexbox>
    </Grid>
  </>
);
Story3.storyName = 'Tablet Portrait';
Story3.parameters = {
  viewport: {
    defaultViewport: 'tabletPortraitMinimum'
  }
}
Story3.argTypes = {
  className: { control: { disable: true } },
}




export const Story4 = () => (
  <>
    <Typography
      fontSize={65}
      element="div"
      color="gray_2"
      fontWeight={700}
      style={{ textAlign: "center" }}>
      Subscribe to <Typography
        fontWeight={700} color="green_4">Cro</Typography>Coder Jobs
    <Typography style={{ marginTop: '16px' }} element="div" fontSize={24}>
        Get your daily dose of new job postings.
    </Typography>
    </Typography>
    <Grid
      rows="auto auto auto auto"
      columns="auto"
      rowGap="5px"
      style={{ width: '260px', margin: '20px auto' }}
    >

      <Input required label="E-mail" style={{ gridColumn: '1 / span 1', gridRow: '1 / span 1' }} />
      <Button style={{ gridColumn: '1 / span 1', gridRow: '3 / span 1' }}> Submit</Button>
      <Flexbox alignItems="baseline" style={{ gridColumn: '1 / span 1', gridRow: '2 / span 1', marginBottom: '10px' }}>
        <Icon fontSize={14} color="gray_2" style={{ margin: '0 10px' }} icon="checkbox-unchecked" />
        <Typography fontSize={16} color="gray_2" >A confirmation of terms of services </Typography>
      </Flexbox>
    </Grid>
  </>
);

Story4.storyName = 'Mobile';
Story4.parameters = {
  viewport: {
    defaultViewport: 'mobileMinimum'
  }
}
Story4.argTypes = {
  className: { control: { disable: true } },
}


