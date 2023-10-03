import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfile } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

function Profiles({ getProfile, profile: { profiles, loading } }) {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developer</h1>
          <p>
            <i className="fab fa-connectdevelop"></i> Browse and Connect with
            Developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
                 profiles.map((profile) => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
            ) : (<h4>No Profile Found...</h4>)}
          </div>
        </>
      )}
    </>
  );
}

Profiles.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Profiles);
