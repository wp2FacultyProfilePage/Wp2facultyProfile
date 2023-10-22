import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import adminicon from './adminicon.png';
import './Add.css';

function CRUD() {
  const [newName, setNewName] = useState('');
  const [newPosition, setNewPosition] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'faculty');

  const clearInputs = () => {
    setNewName('');
    setNewPosition('');
    setNewDepartment('');
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, position: newPosition, department: newDepartment });
    clearInputs();
  };

  const updateUser = async (id) => {
    const userDoc = doc(db, 'faculty', id);
    const newInfo = { name: newName, position: newPosition, department: newDepartment };
    await updateDoc(userDoc, newInfo);
    clearInputs();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'faculty', id);
    await deleteDoc(userDoc);
    clearInputs();
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [usersCollectionRef]);

  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to log out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userToken');
        
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been successfully logged out.',
          icon: 'success',
        }).then(() => {
          window.location.href = '/login'; // You can use any routing mechanism here
          // Use navigation to go to the login page
          navigate('/login', { replace: true });
        });
      }
    });
  };

  return (
    <div className="custom-container">
      <div className="custom-sidebar">
        <img src={adminicon} alt="Sidebar Image" id="CustomAdminicon_sidebar" />
        <div className="custom-sidebar-text">
          <h2>CICT FACULTY <br />(ADMIN)</h2>
        </div>
        
        <div className="custom-logout-container">
            <Link to="/add">
              <div className="custom-logout-container">
                <button id="CustomLogoutButton" onClick={handleLogout}>
                  <span className="custom-logout-icon">&#x2716;</span> Log Out
                </button>
              </div>
            </Link>
          </div>
      </div>

      <div className="custom-main-content">
      <div>
          <button className="btn btn-primary" onClick={createUser}>
            Add Faculty
          </button>
        </div>
        <div className="custom-modal">
          <input
          className='mode'
            placeholder="mode"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
          <br />
          <input
          className='mode'
            placeholder="mode"
            value={newPosition}
            onChange={(event) => setNewPosition(event.target.value)}
          />
          <br />
          <input
          className='mode'
            placeholder="mode"
            value={newDepartment}
            onChange={(event) => setNewDepartment(event.target.value)}
          />
          <br />

          {users.map((user) => (
            <div key={user.id} className="custom-modal">
              <h1 className="custom-research-title">Name: {user.name}</h1>
              <h1 className="custom-research-title">Position: {user.position}</h1>
              <h1 className="custom-research-title">Department: {user.department}</h1>
              <button
                className="btn btn-primary"
                onClick={() => updateUser(user.id, user.name, user.position, user.department)}
              >
                Edit Faculty
              </button>
              <button className="btn btn-primary" onClick={() => deleteUser(user.id)}>
                Delete Faculty
              </button>
            </div>
         ) )}

        </div>
      </div>
    </div>
  );
}

export default CRUD;
