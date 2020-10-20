import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import { Link } from "react-router-dom"

import styles from "assets/jss/material-kit-react/views/quizPageSections/quizStyle.js";

const useStyles = makeStyles(styles);

export default function QuestionBox() {
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
    {
      id: 4,
      text:
        "You regularly stand up for your beliefs when they are challenged",
      category: "EI",
    },
  ];

  const [arrayOfAnswers, setArrayOfAnswers] = React.useState([]);
  const [random, setRandom] = React.useState(0);
  const [random2, setRandom2] = React.useState(0);

  function enable(questionNumber, answer) {
    
    arrayOfAnswers[questionNumber] = answer
    setArrayOfAnswers(arrayOfAnswers)

    //I have no idea why I need this, but it doesn't work without it
    setRandom(answer)
    setRandom2(questionNumber)
    console.log("arrayOfAnswers", arrayOfAnswers)
    console.log("random", random)
    console.log("random2", random2)
  }

  return (
    <div className={classes.section}>
      {Object.values(questions).map((question, id) => (
        <div id={id} className={classes.questionBox}>
          <hr />
          <h2>{question.text}</h2>
          <br />
          <GridContainer>
            <GridItem xs={1} sm={1} md={1}></GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Button
                id={id + "-1"}
                onClick={() => {
                  enable(id, 1);
                }}
                color={arrayOfAnswers[id] === 1 ? "success" : "github"}
              >
                Not at all
              </Button>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Button
                id={id + "-2"}
                onClick={() => {
                  enable(id, 2);
                }}
                color={arrayOfAnswers[id] === 2 ? "success" : "github"}
              >
                A Little
              </Button>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Button
                id={id + "-3"}
                onClick={() => {
                  enable(id, 3);
                }}
                color={arrayOfAnswers[id] === 3 ? "success" : "github"}
              >
                Neutral
              </Button>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Button
                id={id + "-4"}
                onClick={() => {
                  enable(id, 4);
                }}
                color={arrayOfAnswers[id] === 4 ? "success" : "github"}
              >
                Somewhat
              </Button>
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Button
                id={id + "-5"}
                onClick={() => {
                  enable(id, 5);
                }}
                color={arrayOfAnswers[id] === 5 ? "success" : "github"}
              >
                Very Much
              </Button>
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
