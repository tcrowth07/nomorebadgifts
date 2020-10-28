import { container, title } from "assets/jss/material-kit-react.js";

import imagesStyle from "assets/jss/material-kit-react/imagesStyles.js";

const adminStyle = {
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
    position: "relative",
  },
  description: {
    //color: "#222222",
    fontSize: "1.3rem",
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important"
  },
  questionBox: {
    textAlign: "center",
    margin: "0px 0 30px"
  },
  finish: {
    fontSize: "1.5rem",
    borderRadius: "20px",
    alignContent: "center"
  },
  container,
  profile: {
    textAlign: "center",
    "& img": {
      maxWidth: "160px",
      width: "100%",
      margin: "0 auto",
      transform: "translate3d(0, -50%, 0)",
      padding: "20px 0 20px"
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
    margin: "20px auto 50px auto",
    textAlign: "center"
  },
  table: {
    border: "1px solid black",
    borderCollapse: "collapse"
  },
  firstRow: {
    border: "1px solid black",
  },
  tableRow: {
    border: "1px solid black",
  },
  header: {
    border: "1px solid black",
    background: "#24706e",
    color: "white",
    padding: "10px"
  },
  td: {
    border: "1px solid black",
    padding: "5px"
  },
  error: {
    color: "red"
  },
  inputLabel: {
    fontSize: "1rem"
  }
};

export default adminStyle;
