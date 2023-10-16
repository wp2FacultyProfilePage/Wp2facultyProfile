import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript
import './Add.css';
import './addscript'; // Import the JavaScript file here
import adminicon from './adminicon.png';


function Add() {
  const [researchFields, setResearchFields] = useState([]);
  const [formData, setFormData] = useState({
    CustomImage: '',
    CustomName: '',
    CustomEmploymentStatus: '',
    CustomTitlePosition: '',
    CustomDepartment: '',
    CustomEducationalAttainment: '',
    CustomCertifications: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout logic here (e.g., clear user session, remove tokens, etc.)
    // For demonstration purposes, let's assume clearing a token from localStorage
    localStorage.removeItem('userToken');

    // Redirect the user to the login page and replace the current entry
    navigate('/', { replace: true });
  };
  // Add your authentication check here (e.g., checking for user token)


  const handleAddResearch = () => {
    setResearchFields([...researchFields, '']);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setFormData({
      CustomImage: '',
      CustomName: '',
      CustomEmploymentStatus: '',
      CustomTitlePosition: '',
      CustomDepartment: '',
      CustomEducationalAttainment: '',
      CustomCertifications: '',
    });
    closeModal();
  };

  

  

  return (
    <div>
      
      <div className="custom-overlay"></div>
      <div className="custom-sidebar">
        <img src={adminicon} alt="Sidebar Image" id="CustomAdminicon_sidebar" />
        <div className="custom-sidebar-text">
          <h2>CICT FACULTY <br />(ADMIN)</h2>
        </div>
        <div className="custom-logout-container">
        <Link to="/">
        <div className="custom-logout-container">
        <button id="CustomLogoutButton" onClick={handleLogout}>
          <span className="custom-logout-icon">&#x2716;</span> Log Out
        </button>
      </div>
</Link>

</div>
      </div>
     
      <div className="custom-main-content">
        <div className="custom-sticky-button-wrapper">
          <div className="container mt-4">
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#addModal"
              onClick={openModal}
            >
              Add Faculty
            </button>
          </div>
        </div>
        <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="CustomLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="CustomLabel">Add Faculty Information</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="CustomImage">Upload Picture:</label>
                      <input type="file" className="form-control" id="CustomImage" accept="image/*" required />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="CustomName">Name:</label>
                      <input type="text" className="form-control" id="CustomName" placeholder="Enter faculty's name" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="CustomEmploymentStatus">Employment Status:</label>
                      <select className="form-control" id="CustomEmploymentStatus" required>
                        <option value="">Select Employment Status</option>
                        <option value="Regular Faculty">Regular Faculty</option>
                        <option value="Part-time Faculty">Part-time Faculty</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="CustomTitlePosition">Title/Position:</label>
                      <input type="text" className="form-control" id="CustomTitlePosition" placeholder="Enter title or position (e.g., Dean, OJT Coordinator)" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="CustomDepartment">Department:</label>
                      <input type="text" className="form-control" id="CustomDepartment" placeholder="Enter department" required />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="CustomEducationalAttainment">Educational Attainment:</label>
                      <textarea className="form-control" id="CustomEducationalAttainment" rows="3" placeholder="Enter educational attainment"></textarea>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="CustomCertifications">Certifications:</label>
                      <textarea className="form-control" id="CustomCertifications" rows="3" placeholder="Enter certifications (if any)"></textarea>
                    </div>
                  </div>
                  <h5 className="modal-title custom-research-title">Research Information:</h5>
                  <div id="CustomResearchFields">
                    {researchFields.map((field, index) => (
                      <div key={index} className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter research field"
                          value={field}
                          onChange={(e) => {
                            const updatedFields = [...researchFields];
                            updatedFields[index] = e.target.value;
                            setResearchFields(updatedFields);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <button type="button" className="btn btn-success mb-2" onClick={handleAddResearch}>+ Add Research</button>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="custom-scrollable-container">
          <div className="custom-scrollable-div"></div>
          <div className="custom-scrollable-div"></div>
          <div className="custom-scrollable-div"></div>
          <div className="custom-scrollable-div"></div>
          <div className="custom-scrollable-div"></div>
          <div className="custom-scrollable-div"></div>
          <div className="custom-scrollable-div"></div>
          <div className="custom-scrollable-div"></div>
        </div>
      </div>
    </div>
  );
}

export default Add;
