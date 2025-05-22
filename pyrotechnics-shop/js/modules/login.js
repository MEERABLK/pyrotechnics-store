import { showAlert } from "./alert.js";

export function handleLogin() {
     const loginButton = document.querySelector('.signin-button');

    if (!loginButton) return;

    loginButton.addEventListener('click', function (e) {
            e.preventDefault();//prevent refresh
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // need to use ?=. to look ahead if the password contains at least one
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
   const usernameRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

         if (!username || !password) {
      showAlert('Please enter both username and password.', 'danger');
   
    }
else if (!passwordRegex.test(password)) {
      showAlert('Password too weak. It must be at least 8 characters long and include uppercase, lowercase, and a number.', 'danger');

    }
    else if(!usernameRegex.test(username))
    {
      showAlert('Invalid email format', 'warning');

    }
else
{
            //temporariy login 
            sessionStorage.setItem('loggedIn', 'true');
            //save username
            localStorage.setItem('username', username);
          
        
    showAlert('Login successful! Redirecting...', 'success');
          //go to cart
            window.location = 'cart.html';
    }
});
}




