import axios from "axios";

import {
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/postConstants";

export const getPOSTs =
  (currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_POSTS_REQUEST });

      let link = `/api/v1/posts?page=${currentPage}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_POSTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_POSTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const newPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_POST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/v1/post/new`, postData, config);

    dispatch({
      type: NEW_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete POST
export const deletePOST = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const { data } = await axios.delete(`/api/v1/post/${id}`);

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update POST
export const updatePOST = (id, postData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_POST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/post/${id}`, postData, config);

    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/post/${id}`);

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data.post,
    });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
