import * as Yup from "yup";

export const signUpValidation = Yup.object({
  firstName: Yup.string()
    .min(4, "FirstName must be of atLeast 4 characters")
    .required("firstName is required"),
  lastName: Yup.string().required("LastName is required"),
  emailId: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Password is required"),
  photoUrl: Yup.mixed().required("Profile pic is required"),
});

export const loginValidation = Yup.object({
  emailId: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Password is required"),
});
