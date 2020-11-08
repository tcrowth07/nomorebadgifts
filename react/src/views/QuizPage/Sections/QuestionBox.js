import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import { Link } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/quizPageSections/quizStyle.js";

import useAxios from "axios-hooks";

const useStyles = makeStyles(styles);

export default function QuestionBox() {
  const classes = useStyles();

  const [arrayOfAnswers, setArrayOfAnswers] = React.useState([]);
  const [random, setRandom] = React.useState(0);

  const url = "https://nomorebadgifts.herokuapp.com/questions";

  let [{ questions, loading, error, response }] = useAxios(url);

  if (loading) return (
    <div className={classes.section}>
    <h2>Loading...</h2>
    <img alt="loading icon" src={require("../../../assets/img/giftLoading.gif")}/>
    </div>
  )
  if (error)
    return (
      <h5 style={{ color: "red" }}>There was an error loading the quiz</h5>
    );

  if (response.data) {
    questions = response.data;
  }

  function enable(questionNumber, answer) {
    arrayOfAnswers[questionNumber] = answer;
    setArrayOfAnswers(arrayOfAnswers);

    //This triggers a rerender for the buttons, without it doesn't work
    let tempRandom = Math.random()
    setRandom(tempRandom)
    console.log(random)
  }

  return (
    <div className={classes.section}>
      {Object.values(questions).map((question, id) => (
        <div key={id} className={classes.questionBox}>
          <hr />
          <h2>{question.text}</h2>
          <br />
          <GridContainer>
            <GridItem xs={1} sm={2} md={2}></GridItem>
            <GridItem xs={12} sm={2} md={2}>
              <Button
                id={id + "-1"}
                onClick={() => {
                  enable(id, 1);
                }}
                color={arrayOfAnswers[id] === 1 ? "success" : "github"}
              >
                Very False
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2}>
              <Button
                id={id + "-2"}
                onClick={() => {
                  enable(id, 2);
                }}
                color={arrayOfAnswers[id] === 2 ? "success" : "github"}
              >
                Somewhat false
              </Button>
            </GridItem>
            {/* <GridItem xs={12} sm={2} md={2}>
              <Button
                id={id + "-3"}
                onClick={() => {
                  enable(id, 3);
                }}
                color={arrayOfAnswers[id] === 3 ? "success" : "github"}
              >
                Neutral
              </Button>
            </GridItem> */}
            <GridItem xs={12} sm={2} md={2}>
              <Button
                id={id + "-4"}
                onClick={() => {
                  enable(id, 4);
                }}
                color={arrayOfAnswers[id] === 4 ? "success" : "github"}
              >
                Somewhat true
              </Button>
            </GridItem>
            <GridItem xs={12} sm={2} md={2}>
              <Button
                id={id + "-5"}
                onClick={() => {
                  enable(id, 5);
                }}
                color={arrayOfAnswers[id] === 5 ? "success" : "github"}
              >
                Very True
              </Button>
            </GridItem>
            <GridItem xs={1} sm={2} md={2}></GridItem>
          </GridContainer>
          <hr />
        </div>
      ))}
      <Link
        to={{
          pathname: "/hobbies",
          state: arrayOfAnswers,
        }}
        className={classes.button}
      >
        <Button
          className={classes.finish}
          color="warning"
        >
          Next
        </Button>
      </Link>
    </div>
  );
}
