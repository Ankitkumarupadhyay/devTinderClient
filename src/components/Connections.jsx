import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addConnections } from "../store/connectionSlice";
import ConnectionCard from "./ConnectionCard";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/url";

function Connections() {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/user/connections`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          dispatch(addConnections(res?.data?.data));
        }
      } catch {
        navigate("/error");
      }
    };
    fetchConnections();
  }, [dispatch, navigate]);

  if (!connections) {
    return <Loader />;
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center min-h-[70vh] my-10">
        <h1 className="text-3xl font-extrabold text-gray-300">
          No connection found!
        </h1>
      </div>
    );
  }
  // console.log(connections)
  return (
    <div className="my-10">
      <h1 className="text-3xl  text-center font-extrabold">Connections</h1>
      <div>
        {connections.map((user) => (
          <ConnectionCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Connections;