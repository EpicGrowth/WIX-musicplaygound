import { authentication } from 'wix-members';
import wixLocation from 'wix-location';

$w.onReady(function () {
    $w('#registerButton').onClick(() => {
        const email = $w('#memberEmail').value;
        const password = $w('#password111').value;
        const firstName = $w('#firstName').value;
        

        const contactInfo = {
            firstName,
            lastName,
            emails: [email]
            // Add additional fields as needed
        };

        authentication.register(email, password, { contactInfo })
            .then((registrationResult) => {
                if (registrationResult.status === 'ACTIVE') {
                    // Registration successful, redirect or show a message
                    wixLocation.to('/https://www.musicplayground.org/profile/%7BuserName%7D/community'); // Replace with your desired page
                } else {
                    // Handle pending status or other cases
                }
            })
            .catch((error) => {
                console.error('Registration error:', error);
                // Display error message to the user
            });
    });
});
