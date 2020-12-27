import React, { useState, useContext, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components-dashboard/Grid/GridItem.js";
import GridContainer from "components-dashboard/Grid/GridContainer.js";
import Table from "components-dashboard/Table/Table.js";
import Card from "components-dashboard/Card/Card.js";
import CardHeader from "components-dashboard/Card/CardHeader.js";
import CardBody from "components-dashboard/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components-dashboard/Card/CardFooter.js";
import Button from "components-dashboard/CustomButtons/Button.js";
import axios from "axios";
import userContext from "context/userContext";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";

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

export default function TableList() {
  const classes = useStyles();
  const { userData } = useContext(userContext);
  const urlGetGiftListByUser =
    "http://localhost:5000/giftlists/" + userData.user.id;
  const [giftList, setGiftList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const GetGiftListByUser = () => {
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
        tableRow.push(<img style={{ width: "80px" }} src={gift.img} />);
      else
        tableRow.push(
          <img
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
      tableRow.push(
        <Button
          onClick={() => {
            deleteGift(
              gift.giftName,
              gift.description,
              gift.price,
              gift.whoCanSee,
              gift.whereToBuy
            );
          }}
          className={classes.deleteButton}
        >
          X
        </Button>
      );
      tempTableData.push(tableRow);
    }
    setTableData(tempTableData);
  }, [giftList]);

  const deleteGift = (name, description, price, whoCanSee, whereToBuy) => {
    try {
      Axios({
        method: "delete",
        url: "http://localhost:5000/giftlists/" + userData.user.id,
        data: { name, description, price, whoCanSee, whereToBuy },
      }).then((response) => {
        setGiftList(response.data.giftList);
        GetGiftListByUser();
      });
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h3 className={classes.cardTitleWhite}>My Gift List</h3>
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
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Formik
          enableReinitialize
          initialValues={{
            giftName: "",
            description: "",
            price: "",
            whoCanSee: "",
            whereToBuy: "",
            imgUrl: "",
          }}
          validationSchema={Yup.object({
            giftName: Yup.string()
              .required("Gift name is required")
              .max(50, "Name must be less than 50 characters"),
            description: Yup.string().max(
              250,
              "Description must be less than 250 characters"
            ),
            price: Yup.number(),
            whoCanSee: Yup.string(),
            whereToBuy: Yup.string(),
            imgUrl: Yup.string(),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            try {
              Axios({
                method: "post",
                url: "http://localhost:5000/giftlists/" + userData.user.id,
                data: {
                  giftName: values.giftName,
                  description: values.description,
                  price: values.price,
                  img: values.imgUrl,
                  whoCanSee: values.whoCanSee,
                  whereToBuy: values.whereToBuy,
                  imgUrl: values.imgUrl,
                },
              }).then((response) => {
                setGiftList(response.data.giftList);
                GetGiftListByUser();
              });
              setSubmitting(false);
              resetForm();
            } catch (err) {
              err.response.data.msg && setError(err.response.data.msg);
            }
          }}
        >
          {(props) => (
            <Form>
              <Card>
                <CardHeader color="warning">
                  <h4 className={classes.cardTitleWhite}>Add a Gift</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Gift Name"
                        name="giftName"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Description"
                        name="description"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Price"
                        name="price"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Who Can View"
                        name="whoCanSee"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Link to item"
                        name="whereToBuy"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Image Url"
                        name="imgUrl"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="success">
                    Add Gift
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          )}
        </Formik>
      </GridItem>
    </GridContainer>
  );
}
