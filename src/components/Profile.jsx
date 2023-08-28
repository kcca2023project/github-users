import React, { useState } from 'react';

const Profile = () => {
    const [data, setData] = useState(null);
    const [userName, setUserName] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [userNotFound, setUserNotFound] = useState(false);

    const handleChange = event => {
        setUserName(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const profileResponse = await fetch(`https://api.github.com/users/${userName}`);
            const profileData = await profileResponse.json();

            if (profileResponse.status === 404) {
                setUserNotFound(true);
            } else {
                setUserNotFound(false);

                const repositoriesResponse = await fetch(profileData.repos_url);
                const repositoriesData = await repositoriesResponse.json();

                setData(profileData);
                setRepositories(repositoriesData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-1/2">
                <div className="mb-6 flex flex-col md:flex-row items-center">
                    <input
                        type="text"
                        className="border rounded p-2 mb-2 md:mb-0 md:mr-2 w-full md:w-64"
                        placeholder="Enter GitHub username"
                        value={userName}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                </div>

                {userNotFound && <p className="text-red-500 mb-4">User not found</p>}

                {data && !userNotFound && (
                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold">{data.name}</h2>
                        <p className="text-gray-600 mb-2">{data.location}</p>
                        <p className="text-gray-600">{data.bio}</p>
                        <img
                            src={data.avatar_url}
                            alt={`${data.login}'s avatar`}
                            className="w-32 h-32 mt-4 mx-auto rounded-full"
                        />
                    </div>
                )}

                {repositories.length > 0 && !userNotFound && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Repositories</h2>
                        <ul className="list-disc pl-6">
                            {repositories.map(repo => (
                                <li key={repo.id} className="text-blue-500 hover:underline mb-2">
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.name}
                                    </a>
                                    <p className="text-gray-600">{repo.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
