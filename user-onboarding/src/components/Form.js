import axios from "axios";
import React, { useState, useEffect } from "react";
import * as yup from "yup";

const Form = () => {
  //This is our DATA STATE
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    terms: false
  });

  //this is our BUTTON STATE
  const [buttonOn, setButtonOn] = useState(true);

  // this is our ERRORS State
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: ""
  });

  //Here is the function to CHANGE STATE(newUser)
  const inputChange = (event) => {
    event.persist();
    lineSchema(event);
    setNewUser({
      ...newUser,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
    });
    console.log(newUser);
  };

  // post - setPost state - not normally used - just this time for the README
  const [post, setPost] = useState();

  //Here is the function for onSubmit
  const onSubmitForm = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((response) => {
        console.log("succesful", response);
        setPost(response.data); // not usually done!!
      })
      .catch((error) => {
        console.log("this is an error", error);
        setErrors(error.data);
      });
  };

  //All validation coding below:
  const formSchema = yup.object().shape({
    name: yup
      .string("Please enter name.")
      .required("A valid name is required."),
    email: yup
      .string()
      .email("Please enter e-mail")
      .required("Valid e-mail address required."),
    password: yup
      .string("Please enter a password")
      .required("Must enter a password"),
    terms: yup.boolean().oneOf([true], "Must agree to terms before proceeding.")
  });

  const lineSchema = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(
        e.target.type === "checkbox" ? e.target.checked : e.target.value
      )
      .then((response) => {
        console.log("succesful", response);
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((response) => {
        console.log("error", response);
        setErrors({ ...errors, [e.target.name]: response.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(newUser).then((succesful) => {
      console.log("working", succesful);
      setButtonOn(!succesful);
    });
  }, [newUser]);

  return (
    <form onSubmit={onSubmitForm}>
      <h1>User Onboarding Form</h1>
      <label htmlFor="name">
        Name
        <input
          id="name"
          name="name"
          placeholder="Enter Name Here"
          type="text"
          value={newUser.name}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="email">
        E-mail
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
        <input
          id="email"
          name="email"
          placeholder="Enter your e-mail here"
          type="email"
          value={newUser.email}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          id="password"
          name="password"
          placeholder="Enter your password here."
          type="password"
          value={newUser.password}
          onChange={inputChange}
        />
      </label>
      <label htmlFor="terms" className="terms">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={newUser.terms}
          onChange={inputChange}
        />
        Terms
      </label>
      <button type="submit" disabled={buttonOn}>
        Submit
      </button>
          <pre>{JSON.stringify(post, null, 2)}</pre>
    </form>
  );
};

export default Form;