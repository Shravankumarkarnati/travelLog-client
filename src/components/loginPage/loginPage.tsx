import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useContext } from "react";
import { AppContext } from "../../utils/context";
import { IInput, userLogin } from "./../../utils/travelLogApi";
import "./loginPage.scss";

interface loginPageProps {}

const validation = ({ username, password }: IInput) => {
  if (!username || username.length < 5) {
    return { error: "Invalid Username : Length Must be Atleast 5." };
  } else if (!password || password.length < 5) {
    return { error: "Invalid Password : Length Must be Atleast 5." };
  }
  return true;
};

const LoginPage: React.FC<loginPageProps> = () => {
  const { token, username, login, changeContext, ...context } = useContext(
    AppContext
  );
  return (
    <div className="loginPage">
      <>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const valid = validation(values);
            if (valid !== true && valid.error) {
              setErrors({ username: valid.error });
              return;
            }
            setSubmitting(true);
            const response = await userLogin(values);
            setSubmitting(false);
            if (response.data.error) {
              setErrors({ username: response.data.error });
              return;
            }
            if (response.data.token) {
              changeContext!({
                token: response.data.token,
                username: values.username,
                login: false,
                ...context,
              });
              return;
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="formikForm">
              <label className="label">Username</label>
              <Field type="username" name="username" placeholder="username" />
              <ErrorMessage
                name="username"
                component="div"
                className="errorMessage"
              />
              <label className="label">Password</label>
              <Field type="password" name="password" placeholder="password" />
              <button type="submit" disabled={isSubmitting} className="mainBtn">
                Login/Register
              </button>
            </Form>
          )}
        </Formik>
      </>
    </div>
  );
};
export default LoginPage;
