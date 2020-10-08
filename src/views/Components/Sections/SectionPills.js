import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Redeem from "@material-ui/icons/Redeem";
import ListAlt from "@material-ui/icons/ListAlt";
import Search from "@material-ui/icons/Search";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";

const useStyles = makeStyles(styles);

export default function SectionPills() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="navigation-pills">
          <div className={classes.title}>
            <h3 className={classes.h3}>How it works</h3>
          </div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <NavPills
                color="rose"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 4, md: 4 },
                  contentGrid: { xs: 12, sm: 8, md: 8 }
                }}
                tabs={[
                  {
                    tabButton: "Giftee Takes Test",
                    tabIcon: ListAlt,
                    tabContent: (
                      <span>
                        <p className={classes.paragraph}>
                          The person that is recieving the gift will take our 5 minute, researched backed quiz. Their answers are fed through a machine
                          learning algorithm that matches them with potentialy great gifts. These results are then stored in the users profile
                          waiting until you search for them.
                        </p>
                      </span>
                    )
                  },
                  {
                    tabButton: "Gifter Looks Up Giftee Profile",
                    tabIcon: Search,
                    tabContent: (
                      <span>
                        <p className={classes.paragraph}>
                          Next, you search for the person they are giving a gift for and select their name. You will
                          be able to see his/her results of the quiz they took earlier. 
                        </p>
                      </span>
                    )
                  },
                  {
                    tabButton: "Gifter Chooses Gift",
                    tabIcon: Redeem,
                    tabContent: (
                      <span>
                        <p className={classes.paragraph}>
                          Now all you have to do is choose a gift you 
                          want to give him/her!
                        </p>
                      </span>
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
