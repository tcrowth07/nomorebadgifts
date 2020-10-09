import React from "react";
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
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/christian.jpg";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import Person from "@material-ui/icons/Person";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  
  const giftIdeas = [
    {
      id: 1,
      name: "Hyrule Warriors",
      description: "The coolest upcoming game",
      price: 59.99,
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
      img:
        "https://images-na.ssl-images-amazon.com/images/I/61VVYg2ur%2BL._AC_SL1000_.jpg",
      whereToBuy:
        "https://www.amazon.com/dp/B07XKF5RM3/ref=ods_gw_ha_btf_dash_lsr_092620?pf_rd_r=AXBNZBYQ7ZD25M3E8JWA&pf_rd_p=b783eb6c-5da9-4fe3-9b0c-38a7927b0265",
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
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/bg4.jpg")} />
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
                    <h3 className={classes.title}>Christian Louboutin</h3>
                    <h6></h6>
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
              </GridItem>
            </GridContainer>
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
                        <>
                          <h2>
                            Christian's recieving type is <b>INTP</b>
                          </h2>
                          <img src={require("assets/img/intp.png")} />
                          <p className={classes.typeDescription}>
                            INTPs have extremely eclectic taste when it comes to
                            gifts. They aren’t as easy to pin down as some types
                            are, but it also makes for a more exciting
                            experience trying to track down just the right
                            thing! For the most part INTPs enjoy the holidays as
                            long as they aren’t expected to attend every party
                            and make small talk with every extended family
                            member. They enjoy the food, spending time with
                            their dearest friends, and the extra time off work
                            to relax and catch up on some of their favorite
                            activities.
                            <br />
                            <br />
                            INTPs tend to be relatively easy-going about
                            receiving gifts. They appreciate the thought that
                            goes into the gift and about 80% of the INTPs I
                            spoke with said that they usually enjoyed their
                            presents and figured they were easy to buy for. The
                            other 20% of the INTPs I spoke with (I spoke with
                            roughly 70 INTPs) said that they were difficult to
                            buy for because they just purchase what they want
                            when they want it and have a hard time thinking of
                            something they want that they don’t already have
                            (besides cash).
                            <br />
                            <br />
                            Many INTPs are apprehensive about public
                            gift-giving. They can feel self-conscious opening
                            presents around other people who are anticipating a
                            response. They can worry about whether they seem
                            surprised or happy enough, and can also worry about
                            the “contracts” of gift-giving. They want to feel
                            free to give to whom they wish and to not have to
                            shop for people they don’t know very well yet. If
                            you’re buying an INTP a gift, but don’t know them
                            very well, make sure to make it clear that you’re
                            just doing this for fun but you don’t want something
                            in return.
                            <br />
                            <br />
                            When it comes to giving gifts, INTPs tend to be
                            thoughtful and considerate, but they usually aren’t
                            interested in buying things for large groups of
                            extended family and people at the office. They enjoy
                            buying gifts for very loyal and close friends and
                            family members.
                          </p>
                        </>
                      ),
                    },
                    {
                      tabButton: "Gift Ideas",
                      tabIcon: EmojiObjectsIcon,
                      tabContent: giftIdeas.map((idea, id) => (
                        <>
                          <div id={id} className={classes.root}>
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
                                        {idea.id}
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      <Typography
                                        variant="body2"
                                        style={{ cursor: "pointer" }}
                                      >
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <Typography variant="subtitle1">
                                      {idea.price}
                                    </Typography>
                                    <Button
                                      href={idea.whereToBuy}
                                      target="_blank"
                                    >
                                      Buy
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Paper>
                          </div>
                        </>
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
