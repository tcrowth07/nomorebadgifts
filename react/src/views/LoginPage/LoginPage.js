import React, { useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";

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
                    email: "",
                    password: "",
                  }}
                  validationSchema={Yup.object({
                    email: Yup.string().required("Email is required"),
                    password: Yup.string().required("Password is required"),
                  })}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                      const loginRes = await Axios({
                        method: "post",
                        url: "http://localhost:5000/users/login",
                        data: {
                          email: values.email,
                          password: values.password,
                        },
                      });

                      setUserData({
                        token: loginRes.data.token,
                        user: loginRes.data.user,
                      });
                      localStorage.setItem("auth-token", loginRes.data.token);
                      setSubmitting(false);
                      history.push("/admin");
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
                        <h4>Login</h4>
                        <div className={classes.socialLine}></div>
                      </CardHeader>
                      <CardBody>
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
                        {error && <h5 style={{color:"red"}}>{error}</h5>}
                      </CardBody>

                      <CardFooter className={classes.cardFooter}>
                        <Button type="submit" color="warning" size="lg">
                          {props.isSubmitting ? "Logging you in..." : "Log In"}
                        </Button>
                        <Link to={"/register"} className={classes.button}>
                          <Button color="github" size="lg">
                            Create Account
                          </Button>
                        </Link>
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
