import { container, title } from "assets/jss/material-kit-react.js";

const landingPageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "40px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
    //background: "#24706e88",
    //background: "#00000088",
    padding: "0px 5px 5px",
    borderRadius: "10px",
    borderColor: "#000000",
    fontSize: "2.5rem",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0",
    //background: "#24706e",
    padding: "10px 0 0",
    borderRadius: "10px"
  },
  titleDiv: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "40px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
    //background: "#24706e88",
    background: "#00000060",
    padding: "0px 2% 5px",
    borderRadius: "10px",
    borderColor: "#000000",
    fontSize: "2.5rem",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "0 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  button: {
    margin: "0 10px 0",
    fontSize: "2rem",
  }
};

export default landingPageStyle;
