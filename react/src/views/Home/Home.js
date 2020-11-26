import React, { useContext, useEffect } from "react";
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

import profile from "assets/img/profile.jpeg";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import giftIdeas from "./giftIdeas.js";
import { useHistory } from "react-router-dom";
import userContext from "context/userContext.js";

const useStyles = makeStyles(styles);

export default function Home(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const { userData } = useContext(userContext);
  const history = useHistory();

  const authToken = localStorage.getItem("auth-token")
  useEffect(() => {
    if (!authToken) history.push("/login")
  });

  return (
    <div>
      <Header
        color="transparent"
        brand="SleighList"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{userData.user ? userData.user.displayName : null}</h3>
                    <br />
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10} className={classes.navWrapper}>
                {giftIdeas.map((idea, id) => (
                  <div key={id}>
                    <div className={classes.root}>
                      <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                          <Grid item>
                            <ButtonBase className={classes.image}>
                              <img
                                className={classes.img}
                                alt="complex"
                                src={idea.img}
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
                                <Typography gutterBottom variant="subtitle1">
                                  {idea.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  {idea.description}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  {idea.id}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography
                                  variant="body2"
                                  style={{ cursor: "pointer" }}
                                ></Typography>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Typography variant="subtitle1">
                                {idea.price}
                              </Typography>
                              <Button href={idea.whereToBuy} target="_blank">
                                Buy
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </div>
                  </div>
                ))}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
