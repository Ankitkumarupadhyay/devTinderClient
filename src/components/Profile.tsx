import React from "react";
import EditProfile from "./EditProfile";

function Profile(): React.ReactElement {
  return (
    <div className="flex gap-10 justify-center">
      <EditProfile />
    </div>
  );
}

export default Profile;
