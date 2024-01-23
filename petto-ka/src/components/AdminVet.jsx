import React, { useState, useEffect } from 'react';
import vet1 from '../assets/veterinary-1.png'
import vet2 from '../assets/veterinary-2.png'

import Swal from 'sweetalert2';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../css/veterinary.css'

export default function AdminVet() {

    const [vets, setVets] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    // State variables for form fields
    const [selectVetID, setSelectVetID] = useState(null);
    const [vetName, setVetName] = useState('');
    const [vetDescription, setVetDescription] = useState('');
    const [vetPrice, setVetPrice] = useState('');
    const [checkboxesEnabled, setCheckboxesEnabled] = useState(false);
    const [vetSelected, setVetSelected] = useState(false); // State to track whether a service is selected

     // Define isVetDoctor and isVetSurgeon state variables
     const [isVetDoctor, setIsVetDoctor] = useState(); // Initialize with a default value
     const [isVetSurgeon, setIsVetSurgeon] = useState(); // Initialize with a default value

    // Function to add a veterinary to the database
    const handleAddVet = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token');
        const data = {
            name: vetName,
            procedure: vetDescription,
            price: vetPrice,
        };

        fetch(`http://localhost:5000/vet/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then((response) => {

            console.log(response);

            if (response == true) {
                // Update the state with the newly added veterinary
                setVets([...vets, { name: vetName, procedure: vetDescription, price: vetPrice, isAvailable: true, isVetDoctor: true }]);
                
                // Reset the form fields
                setVetName('');
                setVetDescription('');
                setVetPrice('');

                // Optionally, you can show a success message using a library like SweetAlert
                Swal.fire('Success', 'Veterinary added successfully!', 'success');
            } else {
                // Handle errors or show an error message
                Swal.fire('Error', 'Failed to add veterinary. Please try again.', 'error');
            }
        })
        .catch((error) => {
            console.error('Error adding veterinary:', error);
            // Handle errors or show an error message
            Swal.fire('Error', 'An error occurred. Please try again.', 'error');
        });
    };


    /* Get Data */
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch(`http://localhost:5000/vet/all`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setVets(data);
                    /* console.log(data); */
                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, []);


    // Function to filter the vets based on the search input
    const filteredVets = vets.filter((vet) => {
        const vetName = vet.name.toLowerCase();
        return vetName.includes(searchInput.toLowerCase());
    });

    // Function to toggle the archive state
    const toggleArchive = (vetId, isAvailable) => {
        /* console.log(isAvailable); */

        const archiveUrl = `http://localhost:5000/vet/${vetId}/${isAvailable ? 'unarchive' : 'archive'}`;

        const token = localStorage.getItem('token');

        // First, update the state to reflect the change
        setVets((prevVets) => prevVets.map((vet) => {
            if (vet._id === vetId) {
                vet.isAvailable = isAvailable;
            }
            return vet;
        }));

        fetch(archiveUrl, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                /* console.log(data); */
                // Update the state or handle the response as needed
            })
            .catch((error) => {
                console.error('Error toggling archive state:', error);
            });
    };


    // Function to fetch specific service details
    const fetchVetDetails = (vetId) => {
        const token = localStorage.getItem('token');

        fetch(`http://localhost:5000/vet/${vetId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        })
        .then((res) => res.json())
        .then((data) => {

            console.log(data);
            // Handle the data you received, for example, you can set it in the state to display in the form fields
            const { name, procedure, price, isAvailable, isVetDoctor, isVetSurgeon} = data;
            setVetName(name);
            setVetDescription(procedure);
            setVetPrice(price);
            enableCheckboxes();
            selectVet();
            console.log(isVetDoctor);
            // setIsVetDoctor(isVetDoctor);
            // setIsVetSurgeon(isVetSurgeon);

            setSelectVetID(vetId);
        })
        .catch((error) => {
            console.error('Error fetching veterinary details:', error);
            // Handle errors or show an error message
            Swal.fire('Error', 'An error occurred while fetching veterinary details. Please try again.', 'error');
        });
    };

    // Function to enable checkboxes
    const enableCheckboxes = () => {
        setCheckboxesEnabled(true);
    };

      // Function to set the selected state
    const selectVet = () => {
        setVetSelected(true);
    };

// Function to unselect the service and reset state variables
    const unselectVet = () => {
        setVetSelected(false); // Unselect the service
        setVetName(""); // Reset vetName
        setVetDescription(""); // Reset vetDescription
        setVetPrice(""); // Reset vetPrice
        setCheckboxesEnabled(false); // Disable checkboxes
    };

    
    const VetDoctorController = (vetId, isVetDoctor) => {
        console.log(vetId.selectVetID); // You have access to the vetId
        console.log(isVetDoctor);

        // const doctorUrl = `http://localhost:5000/vet/${vetId.selectVetID}/${isVetDoctor ? 'setDoctor' : 'unsetDoctor'}`;

        // const token = localStorage.getItem('token');

        // Update the state using the previous state
        // setVets((prevVets) => prevVets.map((vet) => {
        //     if (vet._id === vetId) {
        //         return { ...vet, isVetDoctor: !vet.isVetDoctor }; // Toggle the "Doctor" state based on the current state
        //     }
        //     return vet;
        // }));
        // fetch(doctorUrl, {
        //     method: 'PUT',
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         // Handle the response or update the state as needed
        //         // You can check the response to confirm the update's success
        //         console.log(data);

        //         // You might want to add error handling here as well
        //     })
        //     .catch((error) => {
        //         console.error('Error toggling "Doctor" state:', error);
        //     });
    

    };

    // const VetSurgeonController = (vetId, isVetSurgeon) => {
    //     console.log(vetId.selectVetID); // You have access to the vetId
    //     console.log(isVetSurgeon);

        // const doctorUrl = `http://localhost:5000/vet/${vetId.selectVetID}/${isVetSurgeon ? 'setSurgeon' : 'unsetSurgeon'}`;

        // const token = localStorage.getItem('token');

        // Update the state using the previous state
        // setVets((prevVets) => prevVets.map((vet) => {
        //     if (vet._id === vetId) {
        //         return { ...vet, isVetSurgeon: !vet.isVetSurgeon }; // Toggle the "Doctor" state based on the current state
        //     }
        //     return vet;
        // }));
        // fetch(doctorUrl, {
        //     method: 'PUT',
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         // Handle the response or update the state as needed
        //         // You can check the response to confirm the update's success
        //         console.log(data);

        //         // You might want to add error handling here as well
        //     })
        //     .catch((error) => {
        //         console.error('Error toggling "Doctor" state:', error);
        //     });
    

    // };

    // useEffect(() => {
    //     // Update the defaultChecked values for the checkboxes
    //     document.getElementById('inline-checkbox-1').checked = isVetDoctor;
    //     document.getElementById('inline-checkbox-2').checked = isVetSurgeon;
    // }, [isVetDoctor, isVetSurgeon]);


    
    return (
        <>
            <div className='container-UserAdmin'>
                <div className="div-UserAdmin container row">
                    <h1 className="UserAdmin-header-text mt-5 text-center">Veterinary Management</h1>
                    <p className='UserAdmin-p-text text-center mb-5'>You can see All Vet Staff details, update, delete and create Them here.</p>
                    <div className="row">
                        <div className="Vet-left col-lg-6 col-12">
                            <h3 className='List-txt'>Veterinary List</h3>
                            <div className='search-div my-3'>
                                <input type="text" className='search-input' placeholder='Search Veterinary here..' style={{ paddingLeft: '10px' }} value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                            </div>
                            
                            <div className='vet-container p-3'>
                            {filteredVets.length === 0 ? (
                                <div className="no-matching-users text-center">No Veterinary match the search criteria</div>
                            ) : (
                                <div>
                                {filteredVets.map((vet, index) => (
                                    <div key={index} className="Vet-box" onClick={() => fetchVetDetails(vet._id)}>
                                        <div className='vet-list'
                                            style={{
                                                backgroundColor: vet.isAvailable ? '#D5E5F5' : '#E9F4FF',
                                            }}
                                        >
                                            <div className="vet-img-div">
                                                {vet.isVetDoctor ? (
                                                    <img src={vet1} alt="" className='vet-img' />
                                                ) : vet.isVetSurgeon ? (
                                                    <img src={vet2} alt="" className='vet-img' />
                                                ) : (
                                                    // You can specify a default image or leave it empty here
                                                    <img src={vet2} alt="" className='vet-img' />
                                                )}
                                            </div>
                                            <div className='vet-content'>
                                                <Form>
                                                    <Form.Check type="switch" id={`custom-switch-${vet._id}`} className='Archive-switch lg' label="" defaultChecked={vet.isAvailable} onChange={(e) => { toggleArchive(vet._id, e.target.checked);}}
                                                    />
                                                </Form>
                                                <h4 className='vet-h-txt'>{vet.name}</h4>
                                                <p className='vet-p-txt'>{vet.isVetDoctor ? 'Doctor' : vet.isVetSurgeon ? 'Surgeon' : 'Description'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            )}
                            </div>
                            
                        </div>
                        <div className="Vet-left col-lg-6 col-12">
                            <h3 className='List-txt'>Veterinary Details</h3>
                            <div className='search-div my-3'>
                            <Button variant="primary" type="button" onClick={unselectVet}>Unselect Veterinary</Button>
                            </div>
                            <div className='vet-container p-3'>
                            <Form>
                                {/* Add input fields for vet details */}
                                <Form.Group className="mb-3" controlId="formBasicVetName">
                                    <Form.Label>Veterinary Name</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Enter Vet Name"
                                    value={vetName}
                                    onChange={(e) => setVetName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicVetDescription">
                                    <Form.Label>Veterinary Description:</Form.Label>
                                    <Form.Control
                                    type="text"
                                    placeholder="Enter Vet Description"
                                    value={vetDescription}
                                    onChange={(e) => setVetDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicVetPrice">
                                    <Form.Label>Price:</Form.Label>
                                    <Form.Control
                                    type="number"
                                    placeholder="Enter Vet Price"
                                    value={vetPrice}
                                    onChange={(e) => setVetPrice(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicDoctororSurgeon">
                                {checkboxesEnabled && (
                                    <div>
                                    <Form.Label>Staff:</Form.Label>
                                    <div>
                                    
                                    <Form.Check
                                        inline
                                        label="Doctor"
                                        name="group1"
                                        type="checkbox"
                                        id={`inline-checkbox-1`} // Set the ID of the checkbox based on vet._id
                                        defaultChecked={isVetDoctor}
                                        onChange={(e) => { VetDoctorController({selectVetID}, e.target.checked); }}
                                    />

                                     <Form.Check
                                        inline
                                        label="Surgeon"
                                        name="group1"
                                        type="checkbox"
                                        id={`inline-checkbox-2`}
                                        defaultChecked={isVetSurgeon} // Set the checked attribute based on isVetSurgeon
                                        // onChange={(e) => { VetSurgeonController({selectVetID}, e.target.checked); }}
                                    /> 

                                    </div>
                                    </div>
                                )}
                                </Form.Group>
                            <Button
                                variant="primary"
                                type="button"
                                onClick={(e) => {
                                    if (vetSelected) {
                                    // Add your code for editing the veterinary service here
                                    } else {
                                    handleAddVet(e); // Pass the event object as a parameter
                                    }
                                }}
                                >
                                {vetSelected ? "Edit Veterinary" : "Add a Veterinary"}{" "}
                            </Button>
                            </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
