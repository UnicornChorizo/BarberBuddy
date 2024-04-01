import React from 'react';

const Profile = () => {
    // Fetch user profile data or define it here
    const userProfileData = {
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        // Add more profile data as needed
    };

    return (
        
        <div className="profile">
            <h1>User Profile</h1>
            <div className="profile-info">
                <p><strong>Username:</strong> {userProfileData.username}</p>
                <p><strong>Email:</strong> {userProfileData.email}</p>
                {/* Add more profile info here */}
            </div>
        </div>
    );
}

export default Profile;
