const apiURL = 'http://localhost:3000'; 

function showMessage(message) {
    document.getElementById("message").textContent = message;
}

// Function to register a new user
async function UserRegister() {
    const name = document.getElementById("fname").value;
    const email = document.getElementById("eemail").value;
    const password = document.getElementById("lpassword").value;

    if (!name || !email || !password) {
        showMessage("Please enter name, email, and password.");
        return;
    }

    try {
        // Send a POST request to the registration endpoint on the JSON server
        const response = await fetch(`${apiURL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            showMessage("Registration successful. You can now sign in.");
            window.location.replace("D:\\lss\\Studentlogin.html");
        } else {
            const data = await response.json();
            if (response.status === 409 && data.error === 'EmailAlreadyExists') {
                showMessage("Email already exists. Please choose a different one.");
            } else {
                showMessage("Registration failed. Please try again later.");
            }
        }
    } catch (error) {
        console.error(error);
        showMessage("An unexpected error occurred. Please try again later.");
    }
}

// Function to log in a user
async function SignIn() {
    const email = document.getElementById("eemail").value;
    const password = document.getElementById("lpassword").value;

    try {
        // Fetch user data from the JSON Server
        const response = await fetch(`${apiURL}/users`);
        const data = await response.json();

        const user = data.find(user => user.email === email && user.password === password);

        if (user) {
            showMessage("Login successful. Welcome, " + email + "!");
            window.location.replace("D:\\lss\\home2.html");
        } else {
            showMessage("Invalid email or password. Please try again.");
        }
    } catch (error) {
        console.error(error);
        showMessage("An unexpected error occurred. Please try again later.");
    }
}