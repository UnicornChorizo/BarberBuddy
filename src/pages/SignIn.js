import React, { useEffect } from 'react';

function SignIn() {
    useEffect(() => {
        const loadGoogleApi = () => {
            if (window.gapi) {
                window.gapi.load('auth2', () => {
                    window.gapi.auth2.init({
                        client_id: '933435364177-9vakpd8sn04u9irhmiv67aanfvdispbh.apps.googleusercontent.com',
                    });
                });
                window.gapi.load('signin2', () => {
                    window.gapi.signin2.render('google-signin-button', {
                        'onsuccess': handleSignIn,
                    });
                });
            } else {
                setTimeout(loadGoogleApi, 100); // Retry after 100ms
            }
        };

        loadGoogleApi();
    }, []);

    const handleSignIn = (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        console.log('ID Token:', id_token);
        // Send the id_token to your backend for verification
    };

    return (
        <div className="signin-container">
            <div id="google-signin-button"></div>
        </div>
    );
}

export default SignIn;
