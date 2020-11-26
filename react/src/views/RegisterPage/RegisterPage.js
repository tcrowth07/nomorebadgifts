import React, { useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import { Email, Person, AccountCircle, Event } from "@material-ui/icons/";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Axios from "axios";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import userContext from "context/userContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [error, setError] = React.useState("");
  const { setUserData } = useContext(userContext);
  const history = useHistory();

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="SleighList"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <Formik
                  enableReinitialize
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    displayName: "",
                    birthday: "",
                    email: "",
                    password: "",
                    passwordCheck: "",
                  }}
                  validationSchema={Yup.object({
                    firstName: Yup.string().required("First name is required"),
                    lastName: Yup.string().required("Last name is required"),
                    displayName: Yup.string().required(
                      "Display name is required"
                    ),
                    birthday: Yup.string().required("Birthday is required"),
                    email: Yup.string().required("Email is required"),
                    password: Yup.string()
                      .required("Password is required")
                      .min(6, "Password must be at least 6 characters"),
                    passwordCheck: Yup.string()
                      .required("Password is required")
                      .min(6, "Password must be at least 6 characters"),
                  })}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                      await Axios({
                        method: "post",
                        url: "http://localhost:5000/users/register",
                        data: {
                          firstName: values.firstName,
                          lastName: values.lastName,
                          displayName: values.displayName,
                          birthDate: values.birthday,
                          email: values.email,
                          password: values.password,
                          passwordCheck: values.passwordCheck,
                        },
                      });
                      const loginRes = await Axios.post(
                        "http://localhost:5000/users/login",
                        {
                          email: values.email,
                          password: values.password,
                        }
                      );
                      setUserData({
                        token: loginRes.data.token,
                        user: loginRes.data.user,
                      });
                      localStorage.setItem("auth-token", loginRes.data.token);
                      setSubmitting(false);
                      history.push("/home");
                      resetForm();
                    } catch (err) {
                      err.response.data.msg && setError(err.response.data.msg);
                    }
                  }}
                >
                  {(props) => (
                    <Form>
                      <CardHeader
                        color="warning"
                        className={classes.cardHeader}
                      >
                        <h4>Register a New User</h4>
                        <div className={classes.socialLine}></div>
                      </CardHeader>
                      <CardBody>
                        <CustomInput
                          labelText="First Name"
                          name="firstName"
                          id="firstName"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Person className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <CustomInput
                          labelText="Last Name"
                          name="lastName"
                          id="lastName"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Person className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <CustomInput
                          labelText="Display Name"
                          name="displayName"
                          id="displayName"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <AccountCircle
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <CustomInput
                          labelText="Birthday"
                          name="birthday"
                          id="birthday"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Event className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <CustomInput
                          labelText="Email"
                          name="email"
                          id="email"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "email",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Email className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <CustomInput
                          labelText="Password"
                          name="password"
                          id="password"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                        <CustomInput
                          labelText="Re-enter Password"
                          name="passwordCheck"
                          id="passwordCheck"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "password",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className={classes.inputIconsColor}>
                                  lock_outline
                                </Icon>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                        {error && <h5 style={{color:"red"}}>{error}</h5>}
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Link to={"/login"} className={classes.button}>
                          <Button color="github" size="lg">
                            Back to Login
                          </Button>
                        </Link>
                        {/* <Link to={"/register"} className={classes.button}> */}
                        <Button type="submit" color="warning" size="lg">
                          Create Account
                        </Button>
                        {/* </Link> */}
                      </CardFooter>
                    </Form>
                  )}
                </Formik>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
