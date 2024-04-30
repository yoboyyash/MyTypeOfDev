import React, { useEffect, useState } from "react";
import { useQuery, useApolloClient, useMutation } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { GET_ME } from "../utils/queries";
import { UPDATE_PROFILE } from "../utils/mutations";

const CreateProfile = () => {
    const [about, setAbout] = useState('');
    const [image, setImage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { loading, error, data } = useQuery(GET_ME);
    const client = useApolloClient();

    useEffect(() => {
        if (!loading && !error && data) {
            setAbout(data.me.username || '');
            setFirstName(data.me.firstName || '');
            setLastName(data.me.lastName || '');
        }
    }, [loading, error, data]);

    const handleAboutChange = (e) => {
        setAbout(e.target.value);
        console.log(e.target.value)
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        console.log(e.target.value)
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        console.log(e.target.value)
    };

    const handleImageUpload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const [updatedProfile] = useMutation(UPDATE_PROFILE, {
        refetchQueries: [{ query: GET_ME }],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {            
            await updatedProfile({ variables: { about, image, firstName, lastName } });
            console.log({ about, image, firstName, lastName })
        } catch (err) {            
            console.error(err);
        }
    };

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Create your Profile</h1>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <label className="block mb-4">
                    <span className="text-gray-700">First Name:</span>
                    <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                        value={firstName}
                        onChange={handleFirstNameChange} />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Last Name:</span>
                    <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                        value={lastName}
                        onChange={handleLastNameChange} />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">About Me:</span>
                    <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                        rows="3"
                        value={about}
                        onChange={handleAboutChange} />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Upload Picture:</span>
                    <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
                        type="file"
                        onChange={handleImageUpload} />
                </label>
                {image && <img className="mt-4 rounded" src={image} alt="Profile Preview" />}
                
                    <button type="submit" className="mt-4 px-4 py-2 rounded text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
                        Submit</button>
                
            </form>
        </div>
    );
};

export default CreateProfile;