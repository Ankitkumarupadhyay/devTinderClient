import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useAppSelector } from "../store/appStore";
import UserCard from "./UsersCard";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { BASE_URL } from "../utils/url";
import { User } from "../types";

const Feed = (): React.ReactElement => {
  const feed = useAppSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getFeed = async (): Promise<void> => {
      try {
        const res = await axios.get<User[]>(`${BASE_URL}/user/feed`, {
          withCredentials: true,
        });

        dispatch(addFeed(res.data));
      } catch {
        navigate("/error");
      }
    };
    getFeed();
  }, [dispatch, navigate]);

  if (!feed) return <Loader />;

  if (feed.length <= 0)
    return (
      <h1 className="flex min-h-[70vh] justify-center my-10 font-bold text-gray-300 text-3xl">
        No new users found!
      </h1>
    );

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
