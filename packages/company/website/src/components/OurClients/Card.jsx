import React from "react";
import "@crocoder-dev/components/lib/main.css";
import { Typography, Flexbox } from "@crocoder-dev/components";
import { motion, transform } from "framer-motion";
import styles from "./index.module.scss";
import Img from "gatsby-image";

const item = (delay) => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: delay } },
});

const Card = ({ url, imageAlt, name, client, image, description, delay }) => (
  <motion.div
    transition={{ duration: 0.7 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.9 }}
    variants={item(1)}
    className={styles.card}
  >
    <Flexbox
      as="a"
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className={styles.flex}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        color="gray_2"
        element="h3"
        fontSize={26}
        fontWeight={700}
        className={styles.customer__name}
      >
        {name}
      </Typography>
      <Img
        alt={imageAlt}
        className={`${styles.customer__logo} ${styles[client]}`}
        fadeIn={false}
        fluid={image ? image.childImageSharp.fixed : {}}
        imgStyle={{
          objectFit: "contain",
          height: "auto",
          top: "50%",
          transform: "translate(0%,-50%)",
        }}
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
