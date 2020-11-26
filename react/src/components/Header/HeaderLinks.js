/*eslint-disable*/
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../../context/userContext.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { AccountCircle, Create, ExitToApp } from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

  const { userData, setUserData } = useContext(userContext);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    })
    localStorage.setItem("auth-token", "");
  }
  return (
    <List className={classes.list}>
      {userData.user ? (
        <>
        <ListItem className={classes.listItem}>
          <Link to="/home">
            <Button color="transparent" className={classes.navLink}>
              <AccountCircle className={classes.icons} />
              View My Account
            </Button>
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button href="/" onClick={logout} color="transparent" className={classes.navLink}>
            <ExitToApp className={classes.icons} />
            Log Out
          </Button>
      </ListItem>
      </>
      ) : (
        <>
          <ListItem className={classes.listItem}>
            <Link to="/login">
              <Button color="transparent" className={classes.navLink}>
                <AccountCircle className={classes.icons} />
                Login
              </Button>
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/register">
              <Button color="transparent" className={classes.navLink}>
                <Create className={classes.icons} />
                Create An Account
              </Button>
            </Link>
          </ListItem>
        </>
      )}
      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="/twitter"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="/facebook"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="/instagram"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem> */}
    </List>
  );
}
