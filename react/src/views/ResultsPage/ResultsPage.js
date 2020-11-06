import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";

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

import styles from "assets/jss/material-kit-react/views/resultsPage/resultsStyle.js";

import useAxios from "axios-hooks";

const useStyles = makeStyles(styles);

export default function ResultsPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const arrayOfAnswers = props.location.state;

  let pType = {
    introverted: false,
    observant: false,
    thinking: false,
    judging: false,
  };
  if (arrayOfAnswers[0] < 3) {pType.introverted = true}
  if (arrayOfAnswers[1] < 3) {pType.observant = true}
  if (arrayOfAnswers[2] > 2) {pType.thinking = true}
  if (arrayOfAnswers[3] < 3) {pType.judging = true}

  let pTypeString = ""
  if(pType.introverted) { pTypeString = pTypeString + "i" } else { pTypeString = pTypeString + "e" }
  if(pType.observant) { pTypeString = pTypeString + "s" } else { pTypeString = pTypeString + "n" }
  if(pType.thinking) { pTypeString = pTypeString + "t" } else { pTypeString = pTypeString + "f" }
  if(pType.judging) { pTypeString = pTypeString + "j" } else { pTypeString = pTypeString + "p" }

  const url = "https://nomorebadgifts.herokuapp.com/types/" + pTypeString;
  let [{ data, loading, error, response }] = useAxios(url);

  console.log("url", url)

  console.log("data", data)
  console.log("response", response)

  if (loading) return <h5>Loading...</h5>;
  if (error)
    return (
      <h5 style={{ color: "red" }}>There was an error loading your results</h5>
    );

  let descWithBreaks = "Loading...";

  if (response.data) {
    data = response.data;
    const desc = data.description
    descWithBreaks = desc.split('<br/>').map(str => <p>{str}</p>);
  }

    const giftIdeas = [
      {
        id: 1,
        name: "Hyrule Warriors",
        description: "The coolest upcoming game",
        price: 59.99,
        relation: "Everyone",
        img:
          "https://www.nintendo.com/content/dam/noa/en_US/games/switch/h/hyrule-warriors-age-of-calamity-switch/hyrule-warriors-age-of-calamity-switch-hero.jpg",
        whereToBuy:
          "https://www.amazon.com/Hyrule-Warriors-Age-Calamity-Nintendo-Switch/dp/B08HP4K7KC/ref=sr_1_2?dchild=1&keywords=video%2Bgames&qid=1602002915&sr=8-2&th=1",
      },
      {
        id: 2,
        name: "12 PCS Training Multitool Set Kit",
        description: "A lock pick set with clear lock for beginers",
        price: 17.99,
        relation: "Everyone",
        img:
          "https://cdn.shopify.com/s/files/1/0248/6216/products/lock-pick-set-s.jpg?v=1573140702",
        whereToBuy:
          "https://www.amazon.com/PCS-Training-Multitool-Set-Kit/dp/B08FMQGMXB/ref=sr_1_9?dchild=1&keywords=lock+picking+set&qid=1602004138&sr=8-9",
      },
      {
        id: 3,
        name: "All-new Echo (4th Gen)",
        description:
          "A virtual assistant with premium sound, smart home hub, and Alexa",
        price: 99.99,
        relation: "Everyone",
        img:
          "https://images-na.ssl-images-amazon.com/images/I/61VVYg2ur%2BL._AC_SL1000_.jpg",
        whereToBuy:
          "https://www.amazon.com/dp/B07XKF5RM3/ref=ods_gw_ha_btf_dash_lsr_092620?pf_rd_r=AXBNZBYQ7ZD25M3E8JWA&pf_rd_p=b783eb6c-5da9-4fe3-9b0c-38a7927b0265",
      },
      {
        id: 4,
        name: "WZA Carbon Fiber Minimalist Wallet",
        description:
          "SWZA wallet is designed to create a minimalist wallet which would be perfect for business cards, credit cards, driver’s license, and so much more!",
        price: 14.97,
        relation: "Everyone",
        img:
          "https://images-na.ssl-images-amazon.com/images/I/61lzYaE71JL._AC_SL1200_.jpg",
        whereToBuy:
          "https://www.amazon.com/dp/B07932JXQV/ref=cm_gf_aAN_d_p0_qd0_ik91lRw86xl46xGYaLtL",
      },
      {
        id: 5,
        name: "A picnic lunch",
        description:
          "The chance to get away and spend time with your favorite person",
        price: 0,
        relation: "Spouse",
        img:
          "https://bostonglobe-prod.cdn.arcpublishing.com/resizer/UNFVQe8OFNkTh28qbw46ZyaKMC8=/1440x0/cloudfront-us-east-1.images.arcpublishing.com/bostonglobe/DQVTIEF5Q5G6FL7MGTPTTYAQ7E.jpg",
        whereToBuy: "",
      },
    ];
  return (
    <div>
      <Header
        color="transparent"
        brand="NoMoreBad.Gifts"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
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
                <NavPills
                  alignCenter
                  color="warning"
                  tabs={[
                    {
                      tabButton: "Type",
                      tabIcon: Person,
                      tabContent: (
                        <div key="type">
                          <h2>
                            You're gift recieving type is <b>{data.id}</b>
                          </h2>
                          {/* <img
                            alt="gift giving type"
                            src={require("assets/img/intp.png")}
                          /> */}
                          <div style={{ whiteSpace: 'pre-wrap' }} className={classes.typeDescription}>
                              {descWithBreaks}
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
                        </div>
                      ),
                    },
                    {
                      tabButton: "Gift Ideas",
                      tabIcon: EmojiObjectsIcon,
                      tabContent: giftIdeas.map((idea, id) => (
                        <div key={id} className={classes.root}>
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
                                    <Typography
                                      gutterBottom
                                      variant="subtitle1"
                                    >
                                      {idea.name}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                      {idea.description}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                    >
                                      Who can see: {idea.relation}
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      variant="body2"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <Button color="success">Like</Button>
                                      <Button color="danger">Dislike</Button>
                                      <Button>Already Have/Can't Use</Button>
                                    </Typography>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Typography variant="subtitle1">
                                    ${idea.price}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Paper>
                        </div>
                      )),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
