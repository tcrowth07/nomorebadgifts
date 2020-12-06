/*eslint-disable*/
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userContext from "../../context/userContext.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { AccountCircle, Create, ExitToApp } from "@material-ui/icons";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();

 const { userData, logout } = useContext(userContext);

  return (
    <List className={classes.list}>
      {userData.user ? (
        <>
        <ListItem className={classes.listItem}>
          <h5>Welcome, {userData.user.displayName}</h5>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link to="/admin">
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
    </List>
  );
}
