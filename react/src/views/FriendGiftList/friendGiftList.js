import React, { useState, useContext, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Table from "components-dashboard/Table/Table.js";
import Card from "components-dashboard/Card/Card.js";
import CardHeader from "components-dashboard/Card/CardHeader.js";
import CardBody from "components-dashboard/Card/CardBody.js";
import Button from "components-dashboard/CustomButtons/Button.js";
import axios from "axios";
import userContext from "context/userContext";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  deleteButton: {
    borderRadius: "90px",
    width: "28px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px",
  },
};

const useStyles = makeStyles(styles);

export default function FriendGiftList() {
  const classes = useStyles();
  const { userData } = useContext(userContext);
  const [giftList, setGiftList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const userId = window.location.pathname.substring(15)

  const GetGiftListByUser = () => {
    const urlGetGiftListByUser =
    "http://localhost:5000/giftlists/" + userId;
    axios
      .get(urlGetGiftListByUser)
      .then((resp) => {
        if (resp.data.giftList) {
          setGiftList(resp.data.giftList);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        return <p style={{ color: "red" }}>Error loading your gift list</p>;
      });
  };
  if (loading && userData.user !== "") {
    GetGiftListByUser();
  }

  useEffect(() => {
    let tempTableData = [];
    for (let gift of giftList) {
      let tableRow = [];
      if (gift.img)
        tableRow.push(<img alt="profile" style={{ width: "80px" }} src={gift.img} />);
      else
        tableRow.push(
          <img
            alt="profile"
            style={{ width: "50px" }}
            src={require("../../assets/img/small_logo.png")}
          />
        );
      tableRow.push(gift.giftName);
      if (gift.description) tableRow.push(gift.description);
      else tableRow.push("-");

      if (gift.price) tableRow.push(gift.price);
      else tableRow.push("-");

      if (gift.whoCanSee) tableRow.push(gift.whoCanSee);
      else tableRow.push("-");

      if (gift.whereToBuy) {
        tableRow.push(
          <Button href={gift.whereToBuy} target="_blank">
            Buy
          </Button>
        );
      } else tableRow.push("No Link Provided");
      tableRow.push(<Button color="success">Mark as Purchased</Button>)
      tempTableData.push(tableRow);
    }
    setTableData(tempTableData);
  }, [giftList]);

  return (
        <Card>
          <CardHeader color="warning">
            <h3 className={classes.cardTitleWhite}>Friend Gift List</h3>
          </CardHeader>
          <CardBody>
            <Table
              tableHead={[
                "Img",
                "Gift Name",
                "Description",
                "Price",
                "Who Can View",
                "Where To Buy",
              ]}
              tableData={tableData}
            />
          </CardBody>
        </Card>
  );
}
