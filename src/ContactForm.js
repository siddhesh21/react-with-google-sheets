import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./ContactForm.css";

function ContactForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const [tableData, setTableData] = useState([]);
  console.log(watch("Age"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://sheet.best/api/sheets/4cddc5a8-87ed-454c-b17a-e82c4097cc06")
      .then((response) => {
        console.log("GOOGLE SHEET DATA >>>", response);
        setTableData(response.data);
      });
  };

  const submitFormToGoogle = (data) => {
    console.log("<<< FORM SUBMITTED >>>");
    axios
      .post(
        "https://sheet.best/api/sheets/4cddc5a8-87ed-454c-b17a-e82c4097cc06",

        data
      )
      .then((response) => {
        alert("<<< RECORD ADDED>>>");
        // fetchData();
        setTableData([...tableData, data]);
        console.log(response);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="mainContactForm">
      <table>
        {tableData.map(({ Name, Age, Passion, Goal }) => (
          <tr>
            <td>{Name}</td>
            <td>{Age}</td>
            <td>{Passion}</td>
            <td>{Goal}</td>
          </tr>
        ))}
      </table>

      <form className="contactForm" onSubmit={handleSubmit(submitFormToGoogle)}>
        <TextField
          name="Name"
          error={errors.Name}
          inputRef={register({ required: true })}
          label="Name"
        />
        <TextField
          name="Age"
          error={errors.Age}
          helperText={
            (errors.Age?.type === "validate" && "The Age must be a number") ||
            (errors.Age?.type === "required" && "The Age is required")
          }
          inputRef={register({
            required: true,
          })}
          label="Age"
        />
        <TextField
          name="Passion"
          error={errors.Passion}
          helperText={errors.Passion && "Passion is required"}
          inputRef={register({ required: true })}
          label="Passion"
        />
        <TextField
          name="Goal"
          error={errors.Goal}
          helperText={errors.Goal && "Goal is required"}
          inputRef={register({ required: true })}
          label="Goal"
        />
        <Button variant="contained" type="Submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
