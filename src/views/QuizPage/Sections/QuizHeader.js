import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import ListAlt from "@material-ui/icons/Chat";
import Search from "@material-ui/icons/VerifiedUser";
import Redeem from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/quizPageSections/quizStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Fast and Easy"
              description="This quiz will take no more than 5 minutes"
              icon={ListAlt}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Be yourself"
              description="Don't overthink your answers"
              icon={Search}
              iconColor="success"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Complete it all"
              description="Try to not leave any neutral answers"
              icon={Redeem}
              iconColor="danger"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
  );
}
