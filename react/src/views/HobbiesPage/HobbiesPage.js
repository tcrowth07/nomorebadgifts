import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/quizPageSections/quizStyle.js";

import HobbiesBox from "./Sections/HobbiesBox"

const useStyles = makeStyles(styles);

export default function HobbiesPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const arrayOfAnswers = props.location.state;

  return (
    <div>
      <Header
        color="transparent"
        brand="NoMoreBad.Gifts"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "dark"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/gift.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <div className={classes.profile}>
                  <div>
                    <h2>Select the hobbies you enjoy</h2>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <HobbiesBox arrayOfAnswers={arrayOfAnswers}/>    
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
