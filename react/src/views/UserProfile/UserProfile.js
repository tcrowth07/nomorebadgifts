import React, { useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components-dashboard/Grid/GridItem.js";
import GridContainer from "components-dashboard/Grid/GridContainer.js";

import Button from "components-dashboard/CustomButtons/Button.js";
import Card from "components-dashboard/Card/Card.js";
import CardAvatar from "components-dashboard/Card/CardAvatar.js";
import CardBody from "components-dashboard/Card/CardBody.js";

import avatar from "assets/img/profile.jpeg";
import userContext from "context/userContext";
import GiftList from "views/GiftList/GiftList.js"

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const { userData } = useContext(userContext);
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <GiftList />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
                  <h4 className={classes.cardTitle}>{userData.user.displayName}</h4>
              <p className={classes.description}>
                First Name: {userData.user.firstName}<br/>
                Last Name: {userData.user.lastName}<br/>
                Id: {userData.user.id}<br/>
              </p>
              <Button color="rose" round>
                Edit
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
