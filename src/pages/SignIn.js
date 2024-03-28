import React, { useEffect } from 'react';

function SignIn() {
    useEffect(() => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
            });
        });
        window.gapi.load('signin2', () => {
            window.gapi.signin2.render('google-signin-button');
        });
    }, []);

    return (
        <div className="signin-container">
            <div id="google-signin-button"></div>
        </div>
    );
}

export default SignIn;
