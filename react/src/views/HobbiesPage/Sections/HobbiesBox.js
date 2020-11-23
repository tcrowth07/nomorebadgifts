import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import { Link } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/quizPageSections/quizStyle.js";

import hobbies from "views/HobbiesPage/Sections/hobbies.js"

const useStyles = makeStyles(styles);

export default function QuestionBox(props) {
  const classes = useStyles();

  const arrayOfAnswers = props.arrayOfAnswers;
  const [selectedHobbies, setSelectedHobbies] = React.useState([]);
  const [random, setRandom] = React.useState(0);

  function enable(hobby) {
    let tempHobbies = selectedHobbies
    var index = tempHobbies.indexOf(hobby.name);
    if (index !== -1) {
      tempHobbies.splice(index, 1);
    } else {
      tempHobbies.push(hobby.name);
    }
    setSelectedHobbies(tempHobbies);

    //Still not sure why, but this makes it so the buttons change color. Something to do with setSelectedHobbies not triggering rerender
    let tempRandom = Math.random()
    setRandom(tempRandom)
    console.log(random)
  }

  return (
    <div className={classes.section}>
      <GridContainer>
        {Object.values(hobbies).map((hobby, id) => (
          <GridItem xs={12} sm={3} md={3}>
            <Button
              id={id}
              onClick={() => {
                enable(hobby);
              }}
              color={
                selectedHobbies.indexOf(hobby.name) !== -1
                  ? "success"
                  : "github"
              }
            >
              {hobby.name}
            </Button>
          </GridItem>
        ))}
      </GridContainer>
      <Link
        to={{
          pathname: "/results-page",
          answers: arrayOfAnswers,
          hobbies: selectedHobbies
        }}
        className={classes.button}
      >
        <Button className={classes.finish} color="warning">
          Finish
        </Button>
      </Link>
    </div>
  );
}
