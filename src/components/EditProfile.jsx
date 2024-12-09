import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersCard from "../components/UsersCard";
import Loader from "../components/Loader";
import axios from "axios";

import { addUser } from "../store/userSlice";
import { BASE_URL } from "../utils/url";
import { imageToBase64 } from "../utils/imageToBas";
import { toast } from "react-toastify";

function EditProfile() {
  //getting user data to prefill the form
  const user = useSelector((store) => store.user);
  // console.log(user)
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about);
  const [photoUrl, setPhotoURL] = useState(user?.photoUrl);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      // console.log(res)
      
      dispatch(addUser(res?.data?.data));
      toast.success(res.data.message)

      // setShowToast(true);
      // setTimeout(() => {
      //   setShowToast(false);
      // }, 2000);
    } catch (err) {
      console.log(err)
      toast.error(err.message)
      setError(err?.response?.data?.message || "⚠️ Something went wrong!");
    }
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    // console.log(imagePic);
    setPhotoURL(imagePic)
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

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

              <label className="my-1 font-bold text-lg">FirstName:</label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="my-1 font-bold text-lg">LastName:</label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="my-1 font-bold text-lg">PhotoURL:</label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="file"
                  className="grow cursor-pointer"
                  // value={photoURL}
                  onChange={handleUploadPic}
                />
              </label>
              <label className="my-1 font-bold text-lg">Age:</label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              {/* <label className="my-1 font-bold text-lg">Gender:</label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label> */}
              <div className="flex flex-col items-start p-4">
      <h2 className="text-lg font-semibold mb-4">Select Gender</h2>
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="male"
          name="gender"
          value="Male"
          checked={gender === "Male"}
          onChange={handleGenderChange}
          className="mr-2"
        />
        <label htmlFor="male" className="text-sm">Male</label>
      </div>
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="female"
          name="gender"
          value="Female"
          checked={gender === "Female"}
          onChange={handleGenderChange}
          className="mr-2"
        />
        <label htmlFor="female" className="text-sm">Female</label>
      </div>
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="other"
          name="gender"
          value="Other"
          checked={gender === "Other"}
          onChange={handleGenderChange}
          className="mr-2"
        />
        <label htmlFor="other" className="text-sm">Other</label>
      </div>
      <p className="mt-4 text-sm">
        Selected Gender: <span className="font-medium">{gender || "None"}</span>
      </p>
    </div>

              <label className="my-1 font-bold text-lg">About:</label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>

              {error && (
                <p className="flex justify-center font-bold text-red-600 my-4">
                  {error}
                </p>
              )}
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10">
          <UsersCard
            user={{ firstName, lastName, age, gender, about, photoUrl }}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;