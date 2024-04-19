import React, { useState ,useEffect } from "react";
import axios from "axios"; 
import { CreateUserModal } from "./CreateUserModal";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const totalPages=7;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
  }, [page]);


  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`/api/user?page=${page}&limit=4`);
      setUsers(response.data);
     
      console.log("insidd the fetchUserDetais",response.data)
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  const handleEdit = async (userId) => {

    navigate(`/updatesingleuserdata/${userId}`);

  };

  

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/deleteUser/${userId}`);

      setUsers(users.filter((user) => user._id !== userId));
      fetchUserDetails();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


 

  const toggleCreateUserModal = () => {
    setIsCreateUserModalOpen((prev) => !prev);
  };


  const handleViewDetails = (userId) => {
    
    navigate(`/alldetailsofsingleuser/${userId}`); // Navigate to the user details page
  
};

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };


  return (
    <div>
      <div className="mt-16 ml-10 mr-10 mb-10\\\">
        <table className="min-w-full bg-gray-500 shadow-md rounded-lg overflow-hidden border ">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 uppercase font-semibold text-sm mx-24">
                Username
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm mx-24 ">
                Email
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm mx-24">
                Phone No
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm mx-24">
                Profile
              </th>
              <th className="py-3 px-4 uppercase font-semibold text-sm mx-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => {
              console.log("=====frontend",users);
              return (
                <tr key={user._id}>
                  <td className="py-4 px-6 border-b bg-white  text-center">
                    {user.username}
                  </td>
                  <td className="py-4 px-6 border-b bg-white text-center">
                    {user.email}
                  </td> 
                  <td className="py-4 px-6 border-b bg-white text-center">
                    {user.mobile}
                  </td>
                  <td className="py-4 px-6 border-b bg-white text-center">
                    <img
                      src={user.profile}
                      alt="avatar img"
                      className="w-24 h-24 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-4 px-6 border-b bg-white">
                    
                      <div className="flex justify-around">
                        <button
                          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                          onClick={() => handleViewDetails(user._id)}
                        >
                          View
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                          onClick={() => handleEdit(user._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  rounded"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

{/* <div className="pagination ml-48">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-5 rounded ml-96 mt-20 mb-10" onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
            Page {" "}
        <span className=" bg-green-400 px-2 mx-1 rounded-full">{page}</span>
        OF
        <span className="bg-green-400 px-2 mx-1 rounded-full">{totalPages}</span>
        

        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 rounded" onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div> */}



<div className="pagination ml-20 mt-3">
  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-5 rounded ml-96  mb-10" onClick={handlePrevPage} disabled={page === 1}>
    Previous
  </button>
  {[...Array(totalPages).keys()].map((pageNumber) => (
    <button key={pageNumber + 1} className={`px-3 py-1 mx-1 rounded-full ${pageNumber + 1 === page ? 'bg-green-400' : 'bg-gray-400'}`} onClick={() => setPage(pageNumber + 1)}>
      {pageNumber + 1}
    </button>
  ))}
  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-5 rounded" onClick={handleNextPage} disabled={page === totalPages}>
    Next
  </button>
</div>


        <div>
          <button
            onClick={toggleCreateUserModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded fixed top-3 right-28 "
          >
            Create
          </button>
          <CreateUserModal
          setUsers = {setUsers}
            isOpen={isCreateUserModalOpen}
            onClose={toggleCreateUserModal}
          />
        </div>
        <Logout />
        
      </div>
    </div>
  );
};

export default Home;
