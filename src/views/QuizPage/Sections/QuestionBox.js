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
    {
      id: 4,
      text:
        "You regularly stand up for your beliefs when they are challenged",
      category: "EI",
    },
  ];

  const [arrayOfAnswers, setArrayOfAnswers] = React.useState([]);
  const [Position1, setPosition1] = React.useState(0);
  const [Position2, setPosition2] = React.useState(0);
  const [Position3, setPosition3] = React.useState(0);
  const [Position4, setPosition4] = React.useState(0);
  const [Position5, setPosition5] = React.useState(0);

  function enable(questionNumber, answer) {
    console.log("QuestionNumber: " + questionNumber);
    console.log("Answer: " + answer);
    
    arrayOfAnswers[questionNumber] = answer
    setArrayOfAnswers(arrayOfAnswers)

    setPosition1(arrayOfAnswers[0])
    setPosition2(arrayOfAnswers[1])
    setPosition3(arrayOfAnswers[2])
    setPosition4(arrayOfAnswers[3])
    setPosition5(arrayOfAnswers[4])

    console.log(arrayOfAnswers)
  }

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
              <Button
                id={id + "-1"}
                onClick={() => {
                  enable(id, 1);
                }}
                color={arrayOfAnswers[id] === 1 ? "success" : "grey"}
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
                color={arrayOfAnswers[id] === 2 ? "success" : "grey"}
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
                color={arrayOfAnswers[id] === 3 ? "success" : "grey"}
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
                color={arrayOfAnswers[id] === 4 ? "success" : "grey"}
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
                color={arrayOfAnswers[id] === 5 ? "success" : "grey"}
              >
                Very Much
              </Button>
            </GridItem>
            <GridItem xs={1} sm={1} md={1}></GridItem>
          </GridContainer>
          <hr />
        </div>
      ))}
      {/* <Link to={"/results-page"} className={classes.button}> */}
        <Button href="/results-page" className={classes.finish} color="warning">
          Finish
        </Button>
      {/* </Link> */}
    </div>
  );
}
