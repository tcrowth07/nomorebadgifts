import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/resultsPage/resultsStyle.js";

import GiftList from "./GiftList";

const useStyles = makeStyles(styles);

export default function ResultsPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const selectedHobbies = props.location.hobbies;
  console.log(selectedHobbies)
  
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
            <h2 className={classes.title}>Your Gift List:</h2>
            <div className={classes.typeDescription}>
                This is your gift list based on your gift recieving type and your hobbies. You can like or dislike ideas, or tell us
                you already have this item or it doesn't apply. You also have the option of specifying who can see each item, whether
                it be your spouse, friends, coworkers, etc...
            </div>
            <div className={classes.navWrapper}>
              {/* <Button
                onClick={() => toggleGiftList()}
                color={showGiftList ? "rose" : "success"}
              >
                {showGiftList ? "Hide Gift List" : "Show My Gift List"}
              </Button> */}
              <GiftList />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
