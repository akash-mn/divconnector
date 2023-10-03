import axios from "axios";
import { setAlert } from "./alert";
import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE,GET_PROFILES,GET_REPOS } from "./types";

// Get Current User Profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/profile/me`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Get All profile
export const getProfile = () => async (dispatch) => {
  dispatch({type:CLEAR_PROFILE});
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/profile`);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get All profileById
export const getProfileById =  userId => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,

    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// Create Or Update profile
export const createProfile=(formData,navigate,edit)=> async dispatch=>{
   try {
    const config={
      header:{
        'Content-Type':'application/json'
      }
    }
    const res=await axios.post(`${process.env.REACT_APP_BASE_URL}/api/profile`,formData,config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert(edit?'Profile Updated':'Profile Created' ,'success'));
    if(!edit){
      navigate('/dashboard');
    }
   } catch (err) {
    const errors = err.response.data.error;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
   }
}

// Add Experience
export const addExperience=(formData,navigate)=>async dispatch=>{
  try {
    const config={
      header:{
        'Content-Type':'application/json'
      }
    }
    const res=await axios.put(`${process.env.REACT_APP_BASE_URL}/api/profile/experience`,formData,config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Added' ,'success'));
      navigate('/dashboard');
   } catch (err) {
    const errors = err.response.data.error;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
   }

}

// Add Education
export const addEducation=(formData,navigate)=>async dispatch=>{
  try {
    const config={
      header:{
        'Content-Type':'application/json'
      }
    }
    const res=await axios.put(`${process.env.REACT_APP_BASE_URL}/api/profile/education`,formData,config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Added' ,'success'));
      navigate('/dashboard');
   } catch (err) {
    const errors = err.response.data.error;
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
   }

}

// Delete experience
export const deleteExperience=id=>async dispatch=>{
   try {
    const res=await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/profile/experience/${id}`);
    dispatch({
      type:UPDATE_PROFILE,
      payload:res.data
    });
    dispatch(setAlert('Experience Removed' ,'success'));
   } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
   }
}

// Delete education
export const deleteEducation=id=>async dispatch=>{
  try {
   const res=await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/profile/education/${id}`);
   dispatch({
     type:UPDATE_PROFILE,
     payload:res.data
   });
   dispatch(setAlert('Education Removed' ,'success'));
  } catch (err) {
   dispatch({
     type: PROFILE_ERROR,
     payload: { msg: err.response.statusText, status: err.response.status },
   });
  }
}

// Delete Account and Profile
export const deleteAccount=id=>async dispatch=>{
 if(window.confirm('Are you sure? This can Not be undone!')){
  try {
    // eslint-disable-next-line
    const res=await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/profile`);
    dispatch({
      type:CLEAR_PROFILE,
    });
    dispatch({
      type:ACCOUNT_DELETED,
    });
    dispatch(setAlert('Your Account Has Been Permanatly deleted' ,'danger'));
   } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
   }
 }
}