import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Navigate } from "react-router-dom";
import { useAuth } from '../AuthContext'; // Import useAuth
import '../css/users.css';

export default function Users() {

  const {user} = useAuth();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const usersPerPage = 3;

  /* Get Data */
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`http://localhost:5000/users/all`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });
    }
  }, []);

  /* Search Handler */
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`;
    return fullName.toLowerCase().includes(searchInput.toLowerCase());
  });


  /* Pagination */
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  // Calculate the number of pages based on filtered users
  const pageNumbers = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  // Function to make a user admin
  const makeUserAdmin = (userId, userFirstName, userLastName) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5000/users/${userId}/setasadmin`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        
        console.log(data);

        if(data == true) {
          Swal.fire({
              icon: 'success',
              title: 'User is Now Admin',
              text: `${userFirstName} ${userLastName} is now a Admin. `,
          });

          // Assuming your API returns updated user data, update the user in the state
          const updatedUsers = users.map((user) => {
            if (user._id === userId) {
              return { ...user, isAdmin: true };
            }
            return user;
          });
          setUsers(updatedUsers);
        }

      })
      .catch((error) => {
        console.error('Error making user admin:', error);
      });
  };

  // Function to make a user admin
  const makeUserRegular = (userId, userFirstName, userLastName) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5000/users/${userId}/unsetasadmin`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        
        /* console.log(data); */

        if(data == true) {
          Swal.fire({
              icon: 'success',
              title: 'User is Now Regular',
              text: `${userFirstName} ${userLastName} is now a Regular User. `,
          });

          // Assuming your API returns updated user data, update the user in the state
          const updatedUsers = users.map((user) => {
            if (user._id === userId) {
              return { ...user, isAdmin: false };
            }
            return user;
          });
          setUsers(updatedUsers);
        }

      })
      .catch((error) => {
        console.error('Error making user admin:', error);
      });
  };

  // ... (previous code)
  return (
    <>
      {user ? (
          user.isAdmin ? (
            <div className='container-UserAdmin'>
              <div className="div-UserAdmin container row">
                <h1 className="UserAdmin-header-text mt-5 text-center">User Management</h1>
                <p className='UserAdmin-p-text text-center mb-5'>You can see user details and make User a regular or be Admin.</p>
                <div className='search-div mb-5'>
                  <input
                    type="text"
                    className='search-input'
                    placeholder='Search User Name here..'
                    value={searchInput}
                    onChange={handleSearchInput}
                    style={{ paddingLeft: '10px' }} // Add this line to set the left padding
                  />
                </div>

                <div className='cards-container'>
                  {filteredUsers.length === 0 ? (
                    <div className="no-matching-users text-center">
                      No users match the search criteria
                    </div>
                  ) : (
                    currentUsers.map((user) => (
                      <div key={user._id} className='card-user'>
                        <div className='box'>
                          <div className='icon'>
                            <div className='iconBox'>
                              <ion-icon name="person-outline"></ion-icon>
                            </div>
                          </div>
                          <div className='content'>
                            <h3 className='UserName'>{user.firstName} {user.lastName}</h3>
                            <div className='UserID'>{user._id}</div>
                            <div className='UserEmail'>{user.email}</div>
                            <div className='UserMobile'>{user.mobileNo}</div>
                            <br></br>
                            {/* You can add more functionality here, like making a user an admin */}
                            {user.isAdmin ? (
                              <a href="#" className='Userbtn AdminUser' onClick={() => makeUserRegular(user._id, user.firstName, user.lastName)}>Make User</a>
                            ) : (
                              <a href="#" className='Userbtn User' onClick={() => makeUserAdmin(user._id, user.firstName, user.lastName)}>Make Admin</a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className='Pagination-div pt-5'>
                  <Pagination>
                    {Array(pageNumbers)
                      .fill()
                      .map((_, index) => (
                        <Pagination.Item
                          key={index}
                          active={index + 1 === currentPage}
                          onClick={() => paginate(index + 1)}
                        >
                          {index + 1}
                        </Pagination.Item>
                      ))}
                  </Pagination>
                </div>
              </div>
            </div>
          ) : (
            <Navigate to="/dashboard" />
          )
        ) : (
          <Navigate to="/" />
        )
      }



      
    </>
  );

}






