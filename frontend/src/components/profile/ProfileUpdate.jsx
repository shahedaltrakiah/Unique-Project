import React from "react";
import "./Profile.css";


function Update(){
  return(
    <>
  {/* Edit Profile */}
  <div
    className="modal fade"
    id="editProfileModal"
    aria-labelledby="editProfileModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <form
        action="/customers/profile/update"
        method="POST"
        encType="multipart/form-data"
        id="editProfileForm"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProfileModalLabel">
              Edit Profile
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <input
                type="hidden"
                name="id"
              />
              {/* Hidden ID field */}
              <div className="col-md-6">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                />
              </div>
              <div className="col-md-6">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                />
              </div>
              <div className="col-md-12 mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                />
              </div>
              <div className="col-md-12 mt-3">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone_number"
                />
              </div>
              <div className="col-md-12 mt-3">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                />
              </div>
              <div className="col-md-12 mt-3">
                <label>Profile Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                />
                {/* Image upload field */}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-primary"
              id="saveChangesBtn"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</>



);}

export default Update;