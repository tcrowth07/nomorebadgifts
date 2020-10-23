import { container, title } from "assets/jss/material-kit-react.js";

const pillsStyle = {
  section: {
    padding: "10px 0"
  },
  container,
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  paragraph: {
    fontSize: "2rem",
    lineHeight: "2.5rem"
  },
  h3: {
    fontSize: "3.5rem",
    fontWeight: "bold"
  }
};

export default pillsStyle;
