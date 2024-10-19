import React, { useEffect, useState } from 'react'
import { deleteEmployeAPI, getAllEmployeeAPI } from '../services/allApi'
import Add from './Add';

const Home = () => {
   const [allEmployee, setAllEmployee] = useState([]);
   const [employeeToEdit, setEmployeeToEdit] = useState(null); // State for employee to edit

   useEffect(() => {
      gettAllEmployee();
   }, []);

   const gettAllEmployee = async () => {
      try {
         const response = await getAllEmployeeAPI();
         setAllEmployee(response.data);
      } catch (err) {
         console.log(err);
      }
   };

   // Function to set the employee to edit and show the modal
   const editEmployee = (employee) => {
      setEmployeeToEdit(employee);
   };

   // delete employee details
   const deleteEmployee = async (id) => {
      await deleteEmployeAPI(id);
      gettAllEmployee();
   };

   return (
      <>
         <div className='m-5 text-dark'>
            <Add
               addNewEmployee={newEmployee => setAllEmployee([...allEmployee, newEmployee])}
               employeeToEdit={employeeToEdit}
               updateEmployeeInList={updatedEmployee => {
                  setAllEmployee(allEmployee.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
               }}
               clearEmployeeToEdit={() => setEmployeeToEdit(null)}
            />
            <table className='table shadow text-center bg-light'>
               <thead>
                  <tr>
                     <th>Id</th>
                     <th>Employee Id</th>
                     <th>User Name</th>
                     <th>Email</th>
                     <th>Status</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {allEmployee?.length > 0 ? (
                     allEmployee.map((emp, index) => (
                        <tr key={emp.id}>
                           <td>{index + 1}</td>
                           <td>{emp.empId}</td>
                           <td>{emp.username}</td>
                           <td>{emp.email}</td>
                           <td>{emp.status}</td>
                           <td>
                              <div className='d-flex justify-content-center gap-3'>
                                 <div onClick={() => deleteEmployee(emp.id)}><i className="fa-solid fa-trash text-danger"></i></div>
                                 <div onClick={() => editEmployee(emp)}><i className="fa-solid fa-pen-to-square text-primary"></i></div>
                              </div>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <div className='text-danger fw-bolder p-3'>No Employee Details are Uploaded!!</div>
                  )}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default Home;
