import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/resultsPage/resultsStyle.js";

import useAxios from "axios-hooks";

import { useHistory } from "react-router-dom";

import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);

export default function ResultsPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const arrayOfAnswers = props.location.answers;
  const selectedHobbies = props.location.hobbies;

  const [showGiftList, setShowGiftList] = React.useState(false);

  console.log(selectedHobbies);

  const history = useHistory();
  if (arrayOfAnswers === undefined) {
    history.push("/");
  }
  /////Temporary way of getting quiz results - a butt ton of if statements)////
  let pType = {
    introverted: false,
    observant: false,
    thinking: false,
    judging: false,
  };
  if (arrayOfAnswers[0] < 3) {
    pType.introverted = true;
  }
  if (arrayOfAnswers[1] < 3) {
    pType.observant = true;
  }
  if (arrayOfAnswers[2] > 2) {
    pType.thinking = true;
  }
  if (arrayOfAnswers[3] < 3) {
    pType.judging = true;
  }

  let pTypeString = "";
  if (pType.introverted) {
    pTypeString = pTypeString + "i";
  } else {
    pTypeString = pTypeString + "e";
  }
  if (pType.observant) {
    pTypeString = pTypeString + "s";
  } else {
    pTypeString = pTypeString + "n";
  }
  if (pType.thinking) {
    pTypeString = pTypeString + "t";
  } else {
    pTypeString = pTypeString + "f";
  }
  if (pType.judging) {
    pTypeString = pTypeString + "j";
  } else {
    pTypeString = pTypeString + "p";
  }

  const url = "https://nomorebadgifts.herokuapp.com/types/" + pTypeString;
  let [{ data, loading, error, response }] = useAxios(url);

  if (loading) return <h5>Loading...</h5>;
  if (error)
    return (
      <h5 style={{ color: "red" }}>There was an error loading your results</h5>
    );

  let descWithBreaks = "Loading...";

  if (response.data) {
    data = response.data;
    const desc = data.description;
    descWithBreaks = desc.split("<br/>").map((str, key) => (
      <p className={classes.typeDescription} key={key}>
        {str}
      </p>
    ));
  }

  return (
    <div>
      <Header
        color="transparent"
        brand="NoMoreBad.Gifts"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "dark",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/bg4.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <h2 className={classes.title}>Your Results:</h2>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10} className={classes.navWrapper}>
                <div key="type">
                  <h2>
                    You're gift recieving type is <b>{data.id}</b>
                  </h2>
                  <div className={classes.typeDescription}>
                    {descWithBreaks}
                  </div>
                </div>
                <div className={classes.share}>
                  <h3>Share your results!</h3>
                  <Button justIcon link className={classes.margin5}>
                    <i className={"fab fa-twitter"} />
                  </Button>
                  <Button justIcon link className={classes.margin5}>
                    <i className={"fab fa-instagram"} />
                  </Button>
                  <Button justIcon link className={classes.margin5}>
                    <i className={"fab fa-facebook"} />
                  </Button>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.navWrapper}>
            <Link
                to={{
                pathname: "/gift-list",
                answers: arrayOfAnswers,
                hobbies: selectedHobbies
                }}
                className={classes.button}
            >
                <Button className={classes.finish} color="warning">
                View My Gift List
                </Button>
            </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
