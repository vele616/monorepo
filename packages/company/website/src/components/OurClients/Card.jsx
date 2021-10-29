import React from "react";
import "@crocoder-dev/components/lib/main.css";
import { Typography, Flexbox } from "@crocoder-dev/components";
import { motion } from "framer-motion";
import styles from "./index.module.scss";
import Img from "gatsby-image";

const item = (delay) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: delay } },
});

const Card = ({ className, name, image, description, delay }) => (
  <motion.div
    transition={{ duration: 0.7 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    variants={item(1)}
    className={styles.card}
  >
    <Flexbox
      className={styles.flex}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        color="gray_2"
        element="h3"
        fontSize={26}
        fontWeight={600}
        className={styles.customer__name}
      >
        {name}
      </Typography>
      <Img
        fadeIn={false}
        fluid={image ? image.childImageSharp.fluid : {}}
        alt={""}
        className={styles.customer__logo}
      />
    </Flexbox>
    <Typography
      as="p"
      color="gray_2"
      fontSize={14}
      className={styles.customer__description}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </motion.div>
);

export default Card;
