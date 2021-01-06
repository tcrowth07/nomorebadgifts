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

export default function FriendRequestPage() {
  const classes = useStyles();
  const { userData } = useContext(userContext);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [tableData, setTableData] = useState([]);
  ///somehow refreshes state to reflect changes, need to find better solution
  const [random, setRandom] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetFriendRequestListByUser = () => {
    console.log(userData.user.id);
    axios({
      method: "get",
      url: "http://localhost:5000/friendRequests/" + userData.user.id,
    })
      .then((resp) => {
        console.log(resp);
        if (resp.data.friendRequestList) {
          setFriendRequestList(resp.data.friendRequestList);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        return <p style={{ color: "red" }}>Error loading your Friend list</p>;
      });
  };

  const acceptFriendRequest = (friendId) => {
    //first delete user id of friend from logged-in user's friendRequestList
    axios({
      method: "delete",
      url: "http://localhost:5000/friendRequests/" + userData.user.id,
      data: {
        friendId,
      },
    }).then((results) => {
      console.log(results);
      setFriendRequestList(results.data.friendRequestList)
    });
    //then change friendAcceptedRequest to true on friend's friendList
    axios({
      method: "post",
      url: "http://localhost:5000/friends/accept/" + friendId,
      data: {
        accepterUserId: userData.user.id,
      },
    }).then((results) => {
      console.log(results);
    });
  };

  if (loading && userData.user !== "") {
    GetFriendRequestListByUser();
  }

  useEffect(() => {
    let tempTableData = [];
    for (let friendId of friendRequestList) {
      axios({
        method: "get",
        url: "http://localhost:5000/users/" + friendId,
      }).then((results) => {
        if (results.data) {
          const friend = results.data;
          let tableRow = [];
          if (friend.img)
            tableRow.push(<img alt="profile" style={{ width: "80px" }} src={friend.img} />);
          else
            tableRow.push(
              <img
                alt="profile"
                style={{ width: "50px" }}
                src={require("../../assets/img/small_logo.png")}
              />
            );
          tableRow.push(friend.displayName);
          tableRow.push(friend.firstName + " " + friend.lastName);
          tableRow.push(
            <Button
              color="success"
              onClick={() => {
                acceptFriendRequest(friendId);
              }}
            >
              Accept Friend Request
            </Button>
            
          );
          tempTableData.push(tableRow);
          setRandom(Math.random());
        }
      });
    }
    setTableData(tempTableData);
  }, [friendRequestList]);

  return (
    <Card>
      <CardHeader color="warning">
        <h3 className={classes.cardTitleWhite}>Friend Requests</h3>
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
