import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/quizPageSections/quizStyle.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();

  const questions = [
    {
      id: 1,
      text: "You enjoy vibrate, social gatherings",
      category: "EI",
    },
    {
      id: 2,
      text: "You often spend time exploring unrealistic ideas",
      category: "JP",
    },
    {
      id: 3,
      text:
        "If your friend is sad, you try to solve their problem rather than comforting them",
      category: "TF",
    },
  ];

  return (
    <div className={classes.section}>
      {Object.values(questions).map((question, id) => (
        <div className={classes.questionBox}>
          <hr />
          <h2>{question.text}</h2>
          <br />
          <GridContainer>
            <GridItem xs={1} sm={1} md={1}></GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Button>Not at all</Button>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Button>Not very much</Button>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Button>Neutral</Button>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Button>Somewhat</Button>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Button>Very Much</Button>
            </GridItem>
            <GridItem xs={1} sm={1} md={1}></GridItem>
          </GridContainer>
          <hr />
        </div>
      ))}
      <Link to={"/results-page"} className={classes.button}>
        <Button className={classes.finish} color="warning">
          Finish
        </Button>
      </Link>
    </div>
  );
}
