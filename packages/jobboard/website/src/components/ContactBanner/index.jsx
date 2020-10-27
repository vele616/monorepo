import React from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';
import { Typography } from '@crocoder-dev/components';
import styles from './index.module.scss';


const Banner = ({ image, title, text, email }) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.text}>
          <div className={styles.image}>
            <Img
              fadeIn={false}
              fluid={image ? image.childImageSharp.fluid : {}}
              alt={'abc'}
            />
          </div>

          <Typography color="gray_6" className={styles.upper} fontWeight={700} fontSize={22} element="div">
            {title}
          </Typography>
          <Typography color="gray_2" fontWeight={400} fontSize={30} element="div">
            {text}
          </Typography>
          <Typography color="green_2" fontWeight={700} fontSize={30} element="div">
            <a href={`mailto:${email}`} className={`${styles.link} link`}>
              {email}
            </a>
          </Typography>
        </div>
      </div>
    </div>
  );
}


const BannerWithQuery = () => (
  <StaticQuery
    query={graphql`
    query {
      homeJson {
        banner {
          title
          email
          text
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `}
    render={data => (<Banner {...data.homeJson.banner} />)}
  />
);

export default BannerWithQuery;