import React from "react";
import { useDispatch } from "react-redux";
import UsersCard from "../components/UsersCard";
import Loader from "../components/Loader";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/url";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { User } from "../types";

interface EditProfileValues {
  firstName?: string;
  lastName?: string;
  age?: string | number;
  gender?: "Male" | "Female" | "Other" | "";
  photoUrl?: string | File;
  about?: string;
}

interface EditProfileResponse {
  message: string;
  data: User;
}

function EditProfile(): React.ReactElement {
  const getLocalStorageUser = (): User | null => {
    const raw = localStorage.getItem("tinderUser");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  };

  const user = getLocalStorageUser();

  const initialValues: EditProfileValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    gender: user?.gender || "",
    photoUrl: user?.photoUrl || "",
    about: user?.about || "",
  };

  const dispatch = useDispatch();

  const handleUpdate = async (values: EditProfileValues): Promise<void> => {
    try {
      let compressedFile: File | string | undefined;
      if (typeof values.photoUrl === "string") {
        compressedFile = values.photoUrl;
      } else if (values.photoUrl instanceof File) {
        compressedFile = await imageCompression(values.photoUrl, {
          maxSizeMB: 10,
          maxWidthOrHeight: 1024,
        });
        if (compressedFile.size > 10 * 1024 * 1024) {
          toast.error("File is too large. Max size is 10MB.");
          return;
        }
      }

      const formData = new FormData();

      const fieldsToCheck: Array<keyof EditProfileValues> = [
        "firstName",
        "lastName",
        "age",
        "gender",
        "about",
      ];
      for (const field of fieldsToCheck) {
        if (values[field] !== initialValues[field]) {
          const val = values[field];
          if (val !== undefined && val !== null) {
            formData.append(field, val.toString());
          }
        }
      }

      if (values.photoUrl !== initialValues.photoUrl && compressedFile) {
        formData.append("photoUrl", compressedFile);
      }

      if (Array.from(formData.keys()).length === 0) {
        toast.error("Update any field");
        return;
      }

      const res = await axios.patch<EditProfileResponse>(
        `${BASE_URL}/profile/edit`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        localStorage.setItem("tinderUser", JSON.stringify(res.data.data));
        toast.success(res.data.message);
      }
    } catch (err) {
      const error = err as Error;
      console.log(error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  const formik = useFormik<EditProfileValues>({
    initialValues: initialValues,
    onSubmit: (values) => handleUpdate(values),
  });

  if (!user) return <Loader />;

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="flex my-10 justify-center md:mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl font-bold">
                Edit Profile
              </h2>

              <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col gap-2"
              >
                <label className="my-1 font-bold text-lg">FirstName:</label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    name="firstName"
                    type="text"
                    className="grow"
                    onChange={formik.handleChange}
                    value={formik.values.firstName || ""}
                  />
                </label>
                {formik.errors.firstName && formik.touched.firstName && (
                  <p className="text-red-500">{formik.errors.firstName} </p>
                )}

                <label className="my-1 font-bold text-lg">LastName:</label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    name="lastName"
                    type="text"
                    className="grow"
                    onChange={formik.handleChange}
                    value={formik.values.lastName || ""}
                  />
                </label>
                {formik.errors.lastName && formik.touched.lastName && (
                  <p className="text-red-500">{formik.errors.lastName} </p>
                )}

                <label className="my-1 font-bold text-lg">Profile image</label>
                <label className="input input-bordered flex items-center gap-2 overflow-hidden">
                  <input
                    name="photoUrl"
                    type="file"
                    className="grow cursor-pointer"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] || null;
                      formik.setFieldValue("photoUrl", file);
                    }}
                    accept="image/*"
                  />
                </label>
                {formik.errors.photoUrl && formik.touched.photoUrl && (
                  <p className="text-red-500">{formik.errors.photoUrl as string} </p>
                )}

                <label className="my-1 font-bold text-lg">Age:</label>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    name="age"
                    type="text"
                    className="grow"
                    onChange={formik.handleChange}
                    value={formik.values.age || ""}
                  />
                </label>

                <div className="flex flex-col items-start p-4">
                  <h2 className="text-lg font-semibold mb-4">Select Gender</h2>
                  <div className="flex items-center mb-2 cursor-pointer">
                    <input
                      onChange={formik.handleChange}
                      type="radio"
                      value="Male"
                      name="gender"
                      checked={formik.values.gender === "Male"}
                      className="mr-2 "
                    />
                    <label htmlFor="male" className="text-sm">
                      Male
                    </label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      onChange={formik.handleChange}
                      type="radio"
                      value="Female"
                      name="gender"
                      checked={formik.values.gender === "Female"}
                      className="mr-2"
                    />
                    <label htmlFor="female" className="text-sm">
                      Female
                    </label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input
                      type="radio"
                      name="gender"
                      className="mr-2"
                      value="Other"
                      checked={formik.values.gender === "Other"}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor="other" className="text-sm">
                      Other
                    </label>
                  </div>
                  <p className="mt-4 text-sm">
                    Selected Gender:{" "}
                    <span className="font-medium">
                      {formik.values.gender || "None"}
                    </span>
                  </p>
                </div>

                <label className="my-1 font-bold text-lg">About:</label>
                <label className=" flex items-center gap-2">
                  <textarea
                    name="about"
                    onChange={formik.handleChange}
                    value={formik.values.about || ""}
                    className="textarea grow"
                    placeholder="Bio"
                  ></textarea>
                </label>

                <div className="card-actions justify-center mt-4">
                  <button
                    disabled={formik.isSubmitting}
                    className="btn btn-primary "
                    type="submit"
                  >
                    {formik.isSubmitting ? (
                      <span className="loading loading-spinner text-info"></span>
                    ) : (
                      "Save Profile"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="my-10">
          <UsersCard
            user={{
              _id: user._id,
              emailId: user.emailId,
              firstName: user.firstName,
              lastName: user.lastName,
              age: user.age,
              gender: user.gender,
              photoUrl: user.photoUrl,
              about: user.about,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default EditProfile;
