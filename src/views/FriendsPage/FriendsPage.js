import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import styles from "assets/jss/material-kit-react/views/quizPageSections/quizStyle.js";

import { Link } from "react-router-dom"

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const friends = [
    {
      userId: 1,
      name: "Christian Louboutin",
      img: "assets/img/faces/christian.jpg"
    },
    {
      userId: 2,
      name: "Another dude",
      img: "assets/img/faces/christian.jpg"
    }
  ]
  return (
    <div>
      <Header
        color="transparent"
        brand="NoMoreBad.Gifts"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/gift.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={require("assets/img/bg4.jpg")} alt="..." className={imageClasses} />
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <h1>Friends</h1>
            {friends.map((friend, id) => (
              <div id={id} className={classes.root}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt="profile"
                        src={friend.img}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid
                      item
                      xs
                      container
                      direction="column"
                      spacing={2}
                    >
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                        >
                          {friend.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                        >
                          {friend.id}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body2"
                          style={{ cursor: "pointer" }}
                        >
                          <Link to="profile-page"><Button color="success">View Profile</Button></Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
            )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
