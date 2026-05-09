import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/appStore";
import { removeRequest, addRequests } from "../store/requestSlice";
import { BASE_URL } from "../utils/url";
import { ConnectionRequest } from "../types";

interface RequestsResponse {
  data: ConnectionRequest[];
}

function Requests(): React.ReactElement {
  const dispatch = useDispatch();
  const requests = useAppSelector((store) => store.requests);
  const navigate = useNavigate();

  const reviewRequest = async (status: "accepted" | "rejected", id: string): Promise<void> => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeRequest(id));
      }
    } catch {
      navigate("/error");
    }
  };

  useEffect(() => {
    const fetchRequests = async (): Promise<void> => {
      try {
        const res = await axios.get<RequestsResponse>(
          `${BASE_URL}/user/requests`,
          {
            withCredentials: true,
          }
        );
        dispatch(addRequests(res.data.data));
      } catch {
        navigate("/error");
      }
    };
    fetchRequests();
  }, [dispatch, navigate]);

  if (!requests) {
    return <Loader />;
  }
  if (requests.length === 0) {
    return (
      <h1 className="text-3xl min-h-[70vh] my-10 flex justify-center font-bold">
        No requests found!
      </h1>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests
        .filter((request) => request.fromUserId !== null) // Filter out null fromUserId
        .map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto  md:w-1/2"
            >
              <div>
                <img
                  alt="photo"
                  className="md:w-36 object-cover md:h-28 md:rounded-full"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + (lastName || "")}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p className="text-sm md:text-xl">{about}</p>
              </div>
              <div className="md:flex ">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary mx-2"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Requests;
