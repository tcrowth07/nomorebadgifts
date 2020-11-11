import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import ListAlt from "@material-ui/icons/ListAlt";
import Search from "@material-ui/icons/Search";
import Redeem from "@material-ui/icons/Redeem";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s help you find a good gift</h2>
          <h5 className={classes.description}>
          Chances are, you are very bad at giving good gifts. That’s ok, we are too. That’s why we made SleighList.
           Our application is great because 
           <ol>
             <li>You can get your spouse, partner, friend, coworker, etc… a gift they will actually like</li>
             <li>They don’t have to tell you what to get, keeping your gift a surprise.</li>
           </ol>
           All they have to do is take a quiz, and all you have to do is find their profile on here. You’ll see a huge list
            of potential presents based on their responses, which you can narrow down by price and other factors.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <h2 className={classes.title}>How it works</h2>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Take the quiz"
              description="The person that is recieving the gift will take our 5 minute, researched backed quiz that matches them with potentialy great gifts."
              icon={ListAlt}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Search friend"
              description="The gifter searches for the person they want to give a gift"
              icon={Search}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Select Gift"
              description="Gifter chooses a gift from the results of the quiz"
              icon={Redeem}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
