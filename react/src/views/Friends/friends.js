import React, { useEffect, useContext, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components-dashboard/Card/Card.js";
import CardHeader from "components-dashboard/Card/CardHeader.js";
import CardBody from "components-dashboard/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Table from "components-dashboard/Table/Table.js";
import userContext from "context/userContext";
import axios from "axios";

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

export default function TypographyPage() {
  const classes = useStyles();
  const { userData } = useContext(userContext);
  const urlGetFriendListByUser =
    "http://localhost:5000/friends/" + userData.user.id;
  const [friendList, setFriendList] = useState([]);
  const [tableData, setTableData] = useState([]);
  ///somehow refreshes state to reflect changes, need to find better solution
  const [random, setRandom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const GetFriendListByUser = () => {
    axios
      .get(urlGetFriendListByUser)
      .then((resp) => {
        if (resp.data.FriendList){
          setFriendList(resp.data.FriendList);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        return <p style={{ color: "red" }}>Error loading your Friend list</p>;
      });
  };

  if (loading && userData.user !== "") {
    GetFriendListByUser();
  }

  useEffect(() => {
    let tempTableData = [];
    for (let friendId of friendList) {
      axios({
        method: "get",
        url: "http://localhost:5000/users/" + friendId.userId,
      }).then((results) => {
        const friend = results.data;

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
        tableRow.push(friend.displayName);
        tableRow.push(friend.firstName + " " + friend.lastName);
        if (friendId.friendAcceptedRequest) {
          tableRow.push(<Button color="success">View List</Button>);
        } else
          tableRow.push(
            "Waiting for " + friend.firstName + " to accept your invite"
          );
        tempTableData.push(tableRow);
        setRandom(Math.random());
      });
    }
    setTableData(tempTableData);
  }, [friendList]);

  return (
    <Card>
      <CardHeader color="warning">
        <h3 className={classes.cardTitleWhite}>My Friends</h3>
      </CardHeader>
      <CardBody>
        <Table
          tableHead={["", "Display Name", "Name", ""]}
          tableData={tableData}
        />
      </CardBody>
    </Card>
  );
}
