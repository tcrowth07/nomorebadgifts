/*eslint-disable*/
import React, { useEffect, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import Card from "components-dashboard/Card/Card.js";
import CardHeader from "components-dashboard/Card/CardHeader.js";
import CardBody from "components-dashboard/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import CustomInput from "components/CustomInput/CustomInput.js";
import { Search } from "@material-ui/icons";
import Table from "components-dashboard/Table/Table.js";
import userContext from "context/userContext";

//import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";

const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function searchFriends() {
  const classes = useStyles();
  const [friendResults, setFriendsResults] = React.useState([]);
  const [friendList, setFriendList] = React.useState([]);
  const [tableData, setTableData] = React.useState([]);
  const [error, setError] = React.useState("");
  const { userData } = useContext(userContext);
  //TODO
  const [random, setRandom] = React.useState(0);

  const sendFriendRequest = async (recieverUserId) => {
    const res = await Axios({
      method: "post",
      url: "http://localhost:5000/friendRequests/",
      data: {
        requesterUserId: userData.user.id,
        recieverUserId,
      },
    });
    const res2 = await Axios({
      method: "post",
      url: "http://localhost:5000/friends/",
      data: {
        requesterUserId: userData.user.id,
        recieverUserId,
      },
    });
    console.log("friendRequest res", res);
    console.log("friends res", res2);
    setFriendList(res2.data.FriendList)
    setRandom(Math.random());
  };

  useEffect(() => {
    let tempTableData = [];
    for (let friend of friendResults) {
      let tableRow = [];
      if (friend.img)
        tableRow.push(<img style={{ width: "80px" }} src={friend.img} />);
      else
        tableRow.push(
          <img
            style={{ width: "50px" }}
            src={require("../../assets/img/small_logo.png")}
          />
        );
      tableRow.push(friend.firstName + " " + friend.lastName);
      tableRow.push(friend.displayName);

      let found = false;
      if (friendList) {
        for (let x of friendList) {
          if (x.userId === friend._id) {
            found = true;
            if (x.friendAcceptedRequest === false) {
              tableRow.push("Request sent");
            } else {
              tableRow.push(<Button color="info">View</Button>);
            }
            break;
          }
        }
      }
      if (!found) {
        tableRow.push(
          <Button color="success" onClick={() => sendFriendRequest(friend._id)}>
            Send Friend Request
          </Button>
        );
      }
      tempTableData.push(tableRow);
    }
    setTableData(tempTableData);
  }, [friendList]);

  //retreive list of friends for logged-in user and disable friends/friend requests
  useEffect(() => {
    if (userData.user) {
      Axios.get("http://localhost:5000/friends/" + userData.user.id).then(
        (results) => {
          setFriendList(results.data.FriendList);
        }
      );
    }
  }, [friendResults]);

  return (
    <Card>
      <CardHeader color="warning">
        <h3 className={classes.cardTitleWhite}>Search People</h3>
      </CardHeader>
      <Formik
        enableReinitialize
        initialValues={{
          search: "",
        }}
        validationSchema={Yup.object({
          search: Yup.string(),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const searchResults = await Axios({
              method: "post",
              url: "http://localhost:5000/users/search",
              data: {
                search: values.search,
              },
            });
            setFriendsResults(searchResults.data);
            setSubmitting(false);
            resetForm();
          } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
          }
        }}
      >
        {(props) => (
          <Form>
            <CardBody>
              <CustomInput
                labelText="Search"
                name="search"
                id="search"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "search",
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
              {error && <h5 style={{ color: "red" }}>{error}</h5>}
              <Button type="submit" color="warning" size="lg">
                {props.isSubmitting ? "Searching..." : "Search"}
              </Button>
            </CardBody>

            <CardFooter className={classes.cardFooter}>
              <Table
                tableHead={["", "Name", "Display Name", ""]}
                tableData={tableData}
              />
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
