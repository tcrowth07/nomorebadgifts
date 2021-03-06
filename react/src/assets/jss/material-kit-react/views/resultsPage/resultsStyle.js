import { container, title } from "assets/jss/material-kit-react.js";

import imagesStyle from "assets/jss/material-kit-react/imagesStyles.js";

const productStyle = {
  section: {
    textAlign: "center",
    padding: "20px 0 20px"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    display: "inline-block",
    position: "relative"
  },
  description: {
    fontSize: "1.3rem",
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important"
  },
  container,
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "200px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)"
    }
  },
  name: {
    marginTop: "-80px"
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999"
  },
  navWrapper: {
    margin: "20px auto 10px auto",
    textAlign: "center"
  },
  typeDescription: {
    fontSize: "1.2rem",
    marginTop: "30px"
  },
  root: {
    flexGrow: 1,
    margin: "30px 0 30px"
  },
  paper: {
    margin: 'auto',
    maxWidth: 600,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  finish: {
    width: "200px",
    height: "50px",
    fontSize: "1.2rem"
  }
};

export default productStyle;
