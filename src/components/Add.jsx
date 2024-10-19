import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormLabel, TextField } from '@mui/material';
import { UploadEmployeeDetailsAPI, updateEmployeeAPI } from '../services/allApi';

const Add = ({ addNewEmployee, employeeToEdit, updateEmployeeInList, clearEmployeeToEdit }) => {
   const [employeeDetails, setEmployeeDetails] = useState({
      empId: "", username: "", email: "", status: ""
   });

   const [show, setShow] = useState(false);

   // Validation state
   const [isEmpIdValid, setIsEmpIdValid] = useState(true);
   const [isUsernameValid, setIsUsernameValid] = useState(true);
   const [isEmailValid, setIsEmailValid] = useState(true);
   const [isStatusValid, setIsStatusValid] = useState(true);

   useEffect(() => {
      if (employeeToEdit) {
         setEmployeeDetails(employeeToEdit);
         setShow(true); // Show modal when editing
      }
   }, [employeeToEdit]);

   const handleClose = () => {
      setShow(false);
      clearEmployeeToEdit();
   };

   // Validation functions
   const validateEmpId = (empId) => /^[0-9]+$/.test(empId);  // Only numbers
   const validateUsername = (username) => /^[a-zA-Z. ]+$/.test(username);  // Only letters
   const validateEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email); // Valid email format
   const validateStatus = (status) => status !== "";  // Ensure status is selected

   const handleUploadEmployeeDetails = async () => {
      const { empId, username, email, status } = employeeDetails;

      // Validate inputs
      const isEmpIdValid = validateEmpId(empId);
      const isUsernameValid = validateUsername(username);
      const isEmailValid = validateEmail(email);
      const isStatusValid = validateStatus(status);

      setIsEmpIdValid(isEmpIdValid);
      setIsUsernameValid(isUsernameValid);
      setIsEmailValid(isEmailValid);
      setIsStatusValid(isStatusValid);

      // If all fields are valid
      if (isEmpIdValid && isUsernameValid && isEmailValid && isStatusValid) {
         try {
            if (employeeToEdit) {
               // Update existing employee
               const response = await updateEmployeeAPI(employeeToEdit.id, employeeDetails);
               if (response.status >= 200 && response.status < 300) {
                  updateEmployeeInList(response.data);
                  alert("Employee Updated Successfully!!!");
               }
            } else {
               // Add new employee
               const response = await UploadEmployeeDetailsAPI(employeeDetails);
               if (response.status >= 200 && response.status < 300) {
                  addNewEmployee(response.data);
                  alert("Employee Added Successfully!!!");
               }
            }
            handleClose();
            setEmployeeDetails({ empId: "", username: "", email: "", status: "" });
         } catch (err) {
            console.log(err);
         }
      } else {
         alert("Please fill the form correctly!!");
      }
   };

   const handleReset = () => {
      setEmployeeDetails({ empId: "", username: "", email: "", status: "" });
      setIsEmpIdValid(true);
      setIsUsernameValid(true);
      setIsEmailValid(true);
      setIsStatusValid(true);
   };

   return (
      <>
         <div className='d-flex justify-content-center align-items-center text-light'>
            <h3>Employee Details</h3>
         </div>
         <Button className='my-5 text-light' variant="primary" onClick={() => setShow(true)}>
            {employeeToEdit ? "Edit Employee" : "Add Employee"}
         </Button>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>{employeeToEdit ? "Edit Employee Details" : "Add Employee Details"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className='w-100 px-2'>
                  <TextField
                     value={employeeDetails.empId}
                     onChange={e => setEmployeeDetails({ ...employeeDetails, empId: e.target.value })}
                     id="outlined-basic" className='w-100 my-3' label="Id" placeholder='Enter your id' variant="outlined"
                     error={!isEmpIdValid}
                     helperText={!isEmpIdValid && "Employee ID must be a valid number."}
                  />
                  <TextField
                     value={employeeDetails.username}
                     onChange={e => setEmployeeDetails({ ...employeeDetails, username: e.target.value })}
                     id="outlined-basic" className='w-100 my-3' label="User Name" placeholder='Enter your username' variant="outlined"
                     error={!isUsernameValid}
                     helperText={!isUsernameValid && "Username must contain only letters."}
                  />
                  <TextField
                     value={employeeDetails.email}
                     onChange={e => setEmployeeDetails({ ...employeeDetails, email: e.target.value })}
                     placeholder='Enter your email' id="outlined-basic" className='w-100 my-3' label="Email" variant="outlined"
                     error={!isEmailValid}
                     helperText={!isEmailValid && "Please enter a valid email."}
                  />
                  <FormLabel id="" className='mt-3 pe-4 text-dark'>Status</FormLabel>
                  <select value={employeeDetails.status} onChange={e => setEmployeeDetails({ ...employeeDetails, status: e.target.value })} id="" className="form-select">
                     <option value="" selected hidden disabled>select a option</option>
                     <option value="Full-time">Full-time</option>
                     <option value="Intern">Intern</option>
                     <option disabled value="Part-time">Part-time</option>
                  </select>
                  {!isStatusValid && <div className='text-danger fw-bold'>Please select a status.</div>}
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleReset}>
                  Reset
               </Button>
               <Button variant="primary" onClick={handleUploadEmployeeDetails}>
                  {employeeToEdit ? "Update" : "Add"}
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default Add;
