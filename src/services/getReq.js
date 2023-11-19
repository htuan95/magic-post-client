import { useContext } from "react";
import makeRequest from "./makeRequest";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";

// GET ALL POSTS
export const GetAllPosts = (QUERY_KEY) => {
  const { currentUser } = useContext(AuthContext);
  try {
    return useQuery([QUERY_KEY], () =>
      makeRequest
        .get("/posts", {
          headers: { Authorization: `Bearer ${currentUser.accessToken}` },
        })
        .then((res) => res.data.posts)
    );
  } catch (error) {}
};

// get list leaders exchange
export const GetLeadersExchange = (QUERY_KEY, role) => {
  const { currentUser } = useContext(AuthContext);
  try {
    return useQuery({
      queryKey: [QUERY_KEY, role],
      queryFn: () =>
        makeRequest
          .get(`/manager/get-list-leader?role=${role}`, {
            headers: { Authorization: `Bearer ${currentUser.accessToken}` },
          })
          .then((res) => res.data.data),
    });
  } catch (error) {
    console.log(error);
  }
};
