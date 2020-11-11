import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import styles from "assets/jss/material-kit-react/views/resultsPage/resultsStyle.js";

import giftIdeas from "./gifts.js";

const useStyles = makeStyles(styles);

export default function GiftList(props) {
  const classes = useStyles();

  return (
    <GridItem xs={12} sm={12} md={10} className={classes.navWrapper}>
      {giftIdeas.map((idea, id) => (
        <div key={id} className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img className={classes.img} alt="complex" src={idea.img} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {idea.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {idea.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Who can see: {idea.relation}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ cursor: "pointer" }}>
                      <Button color="success">Like</Button>
                      <Button color="danger">Dislike</Button>
                      <Button>Already Have/Can't Use</Button>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">${idea.price}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      ))}
    </GridItem>
  );
}
