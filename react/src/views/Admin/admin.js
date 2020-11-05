import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/adminPage/adminStyle.js";
import useAxios from "axios-hooks";

import { Form, Formik, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
//import classes from "*.module.css";

const useStyles = makeStyles(styles);

export default function QuizPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const urlGetQuestions = "https://nomorebadgifts.herokuapp.com/questions";
    const GetQuestions = () => {
        axios.get(urlGetQuestions)
          .then(resp => {
            setQuestions(resp.data, questions);
            setLoading(false)
          })
          .catch(error => {
            console.log(error)
            return(
              <p style={{color: "red"}}>Error loading the questions</p>
            )
          })
    }
    if(loading)
    {
       GetQuestions()
    }


  return (
    <div>
      <Header
        color="transparent"
        brand="NoMoreBad.Gifts"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "dark",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/gift.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8}>
                <div className={classes.profile}>
                  <div>
                    <h1>Admin Page</h1>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <h3>Quiz Questions</h3>
                <table className={classes.table}>
                  <thead>
                    <tr className={classes.firstRow}>
                      <th className={classes.header}>#</th>
                      <th className={classes.header}>Text</th>
                      <th className={classes.header}>Cat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(questions).map((question, id) => (
                      <tr key={id} className={classes.tableRow}>
                        <td className={classes.td}>
                          {question.questionNumber}
                        </td>
                        <td className={classes.td}>{question.text}</td>
                        <td className={classes.td}>{question.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Formik
                  enableReinitialize
                  initialValues={{
                    questionNumber: 0,
                    text: "",
                    category: "",
                  }}
                  validationSchema={Yup.object({
                    questionNumber: Yup.number()
                      .min(1, "Choose a valid question number")
                      .required("Required"),
                    text: Yup.string().required("Required"),
                    category: Yup.string()
                      .min(2, "Must be two characters")
                      .max(2, "Must be two characters"),
                  })}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    console.log("onSubmit", values);
                    const results = await axios({
                      method: "post",
                      url: "/questions",
                      data: {
                        questionNumber: values.questionNumber,
                        text: values.text,
                        category: values.category,
                      },
                    });
                    GetQuestions()
                    setSubmitting(false);
                    resetForm();
                  }}
                >
                  {(props) => (
                    <Form>
                      <h4>Add New Question</h4>
                      <CustomTextInput
                        label="Question Number"
                        name="questionNumber"
                        type="number"
                        placeholder="Question number"
                      />
                      <br />
                      <CustomTextInput
                        label="Question Text"
                        name="text"
                        type="text"
                        placeholder="Enter question here..."
                      />
                      <br />
                      <CustomTextInput
                        label="Category"
                        name="category"
                        type="text"
                        placeholder="Category"
                      />
                      <br />
                      <button type="submit">
                        {props.isSubmitting ? "Loading..." : "Submit"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

  ///Custom Components///
  const CustomTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label htmlFor={props.id || props.name}>
          {label}
        </label>
        <br />
        <input {...field} {...props} />

        {meta.touched && meta.error ? (
          <div>{meta.error}</div>
        ) : null}
      </div>
    );
  };