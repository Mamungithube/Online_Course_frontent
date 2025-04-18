const handleRegister = (event) => {
  event.preventDefault();
  const form = document.getElementById("register-form");
  const formData = new FormData(form);

  const registerData = {
    username: formData.get("username"),
    first_name: formData.get("FirstName"),
    last_name: formData.get("LastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirmPassword"),
  };

  console.log("Registration data", registerData);

  fetch("https://online-course-rose.vercel.app/Student/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  })
    .then((res) => {
      alert(
        "Registration Successful. Please check your email for a confirmation."
      );
      window.location.href = "./check_mail.html";
    })
    .catch((error) => console.log("Registration Error", error));
};




// login

const handleLogin = (event) => {
  event.preventDefault();
  const form = document.getElementById("login-form");
  const formData = new FormData(form);

  const loginData = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  fetch("https://online-course-rose.vercel.app/Student/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Login failed");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      console.log("Auth token received:", data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user_id", data.user_id);
      alert("Login Successful!");
      window.location.href = "./index.html";
    })
    .catch((err) => {
      console.log("Login error", err.message);
      alert("Login failed: " + err.message);
    });
};



const handleLogout = (event) => {
  event.preventDefault();
  const token = localStorage.getItem("authToken");
  console.log(token);

  fetch("https://online-course-rose.vercel.app/Student/logout/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user_id");
      window.location.href = "index.html";
    });
};





// this is data profile

const token = localStorage.getItem('authToken');
if (!token) {
    console.log("not found token in local");
} else {
    fetch('https://online-course-rose.vercel.app/Student/api/profile/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch profile data');
        return response.json();
    })
    .then(data => {
      console.log(data);
        document.getElementById('username').innerText = data.username;
        document.getElementById('email').innerText = data.email;
        document.getElementById('first_name').innerText = data.first_name;
        document.getElementById('last_name').innerText = data.last_name;
    })
    .catch(error => {
        console.error('Error fetching user profile:', error);
    });
}
