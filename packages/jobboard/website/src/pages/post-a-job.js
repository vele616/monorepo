/* eslint-disable react/prop-types */
import React from 'react';
import '@crocoder-dev/components/lib/main.css';
import FullLayout from '../components/PostAJob/Layout';
import { graphql } from 'gatsby';



const PostAJobPage = ({ data }) => {
  return (
    <FullLayout {...data.postajobJson} />
  );
};

export default PostAJobPage;

export const query = graphql`
  query postAJobQuery {
    postajobJson {
      title
      subtitle
      text
      buttonTextRight
      buttonTextLeft
      urlToPR
      image {
        childImageSharp {
          fluid(maxWidth: 558) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }   
  }
`;
