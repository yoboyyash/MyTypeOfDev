import { useEffect, useState } from "react";
import { useQuery, useApolloClient, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { UPDATE_PROFILE } from "../utils/mutations";
import { NavLink } from "react-router-dom";

// CreateProfile allows a user to create or update their profile in the application
const CreateProfile = () => {
    // The useState hook is used to create several state variables that hold the user's profile information and the status of the form submission.
    const [about, setAbout] = useState('');
    const [image, setImage] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [applicationData, setApplicationData] = useState({
        title: '',
        appURL: '',
        appImageURL: ''
    });
    // The GET_ME query fetches the current user's profile information.
    const { loading, error, data } = useQuery(GET_ME);
    const client = useApolloClient();

    const [isSubmitted, setisSubmitted] = useState(false);
    // The useEffect hook is used to update the state variables with the current user's profile information when the GET_ME query completes.
    useEffect(() => {
        if (!loading && !error && data) {
            setAbout(data.me.username || '');
            setFirstName(data.me.firstName || '');
            setLastName(data.me.lastName || '');
            if (!image) {
                setImage(data.me.image || '');
            };
            if (data.me.applicationData) {
                setApplicationData({
                    title: data.me.applicationData.title || '',
                    appURL: data.me.applicationData.appURL || '',
                    appImageURL: data.me.applicationData.appImageURL || ''
                });
            } else {
                setApplicationData({
                    title: '',
                    appURL: '',
                    appImageURL: ''
                });
            }
        }
    }, [loading, error, data]);

    // Event handlers defined to update the state variables when the user types into the form fields.
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
        setImage(e.target.value);
    };

    const handleTitleChange = (e) => {
        setApplicationData({ ...applicationData, title: e.target.value });
    };

    const handleAppURLChange = (e) => {
        setApplicationData({ ...applicationData, appURL: e.target.value });
    };

    const handleAppImageURLChange = (e) => {
        setApplicationData({ ...applicationData, appImageURL: e.target.value });
    };
    // The UPDATE_PROFILE mutation will be sent to the GraphQL server when the user submits the form.
    const [updateProfile] = useMutation(UPDATE_PROFILE, {
        refetchQueries: [{ query: GET_ME }],
    });
    // The handleSubmit function is called when the user submits the form.
    // It sends the UPDATE_PROFILE mutation to the server with the current state variables as variables.
    // If the mutation is successful, the form is marked as submitted, which changes what's displayed on the page.
    // If there's an error, it's logged to the console.
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Check if all application fields are filled out
            const hasApplicationData = applicationData.title && applicationData.appURL && applicationData.appImageURL;

            const variables = {
                about,
                image,
                firstName,
                lastName,
                ...(hasApplicationData && { applicationData }) // Include applicationData only if all fields are filled out
            };

            const response = await updateProfile({ variables });
            console.log(response);
            console.log({ variables })
            setisSubmitted(true);
        } catch (err) {
            console.error(err);
            setisSubmitted(false);
        }
    };

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :</p>;

    // Returns a form that the user can fill out to create or update their profile.
    // If the form has been submitted, a success message is displayed directing user to their Profile.
    // Otherwise, the form is displayed.
    return (
        <div className="flex flex-col items-center  ">

            {firstName && lastName && about && image && applicationData.appImageURL && applicationData.appURL && applicationData.title ? (
                <h1 className="text-7xl bg-orange-500 bg-opacity-80 w-1/3 text-center font-serif rounded-t-xl mt-10 animate-dropin1">Bio</h1>
            ) : (
                <h1 className="text-7xl bg-orange-500 bg-opacity-80 w-1/3 text-center font-serif rounded-t-xl mt-10 animate-dropin1">Bio</h1>
            )}
            {isSubmitted ? (
                <div className="bg-green-800 bg-opacity-95 w-1/3 text-center text-4xl text-black font-serif mt-10 rounded-xl border-4 border-green-950 mb-40 hover:scale-125">Success! {' '}

                    <div className="animate-pulse text-6xl font-bold text-green-400">
                        <NavLink to="/profile">Go to Profile</NavLink>
                    </div>
                </div>

            ) : (
                <form className="w-1/3 bg-orange-500 bg-opacity-90 text-center items-center pb-4 font-serif rounded-b-xl" onSubmit={handleSubmit}>

                    <label className="flex flex-col items-center">
                        <span className="text-black text-xl">First Name:</span>
                        <input className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm "
                            value={firstName}
                            onChange={handleFirstNameChange} />
                    </label>
                    <label className="flex flex-col items-center">
                        <span className="text-black text-xl">Last Name:</span>
                        <input className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm "
                            value={lastName}
                            onChange={handleLastNameChange} />
                    </label>
                    <label className="flex flex-col items-center">
                        <span className="text-black text-xl">About Me:</span>
                        <textarea className="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm "
                            rows="3"
                            value={about}
                            onChange={handleAboutChange} />
                    </label>
                    <label className="flex flex-col items-center">
                        <span className="text-black text-xl">Application Title:</span>
                        <input className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm"
                            value={applicationData.title}
                            onChange={handleTitleChange} />
                    </label>
                    <label className="flex flex-col items-center">
                        <span className="text-black text-xl">Application URL:</span>
                        <input className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm"
                            value={applicationData.appURL}
                            onChange={handleAppURLChange} />
                    </label>
                    <label className="flex flex-col items-center">
                        <span className="text-black text-xl">Application Image URL:</span>
                        <input className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm"
                            value={applicationData.appImageURL}
                            onChange={handleAppImageURLChange} />
                    </label>

                    {applicationData.appImageURL && <img className="mt-4 rounded" src={applicationData.appImageURL} alt="Application Preview" />}

                    <label className="flex flex-col items-center mx-2">
                        <span className="text-black text-xl mt-12">Profile Image URL:</span>
                        <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm "
                            type="text"
                            value={image}
                            onChange={handleImageUpload}
                            placeholder="Enter image URL"
                        />
                    </label>

                    {image && <img className="mt-4 rounded" src={image} alt="Profile Preview" />}
                    <button type="submit" className="mt-4 px-4 py-2 rounded text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none hover:scale-125 duration-300">
                        Submit</button>

                </form>

            )}

        </div>



    );
};

export default CreateProfile;
