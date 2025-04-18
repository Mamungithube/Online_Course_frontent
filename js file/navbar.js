
fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    
    document.getElementById("navbar").innerHTML = data;

    const navElement = document.getElementById("nav-element");
    const token = localStorage.getItem("authToken");

    if (token) {
      fetch("https://online-course-rose.vercel.app/Student/admins/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.is_admin) {
            navElement.innerHTML += `
            <li class="nav-item">
            <a class="nav-link active text-secondary" aria-current="page" href="index.html">
                <i class="fas fa-home"></i> Home
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="All_Course.html">All Course</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="All_teacher.html">All Teacher</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="about.html">About</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="Contect_us.html">Contact Us</a>
        </li>
    </ul>
    <div class="d-flex" style="padding-left: 380px;">
<li>
  <h5><a class="nav-link" href="Teacher_deshboard.html">Admin Deshboard</a></h5>
</li>
<li>
  <h5><a class="nav-link" href="index.html" onclick="handleLogout(event)">Logout</a></h5>
</li>
</div>
            `;
          } else {
            navElement.innerHTML += `
            <li class="nav-item">
            <a class="nav-link active text-secondary" aria-current="page" href="index.html">
                <i class="fas fa-home"></i> Home
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="All_Course.html">All Course</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="All_teacher.html">All Teacher</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="About.html">About</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="Contect_us.html">Contact Us</a>
        </li>
    </ul>
    <div class="d-flex" style="padding-left: 500px;">
<li>
  <h5><a class="nav-link" href="Student_deshboard.html">profile</a></h5>
</li>
<li>
  <h5><a class="nav-link" href="index.html" onclick="handleLogout(event)">Logout</a></h5>
</li>
</div>
            `;
          }
        });
    } else {
      navElement.innerHTML += `
      <li class="nav-item">
      <a class="nav-link active text-secondary" aria-current="page" href="index.html">
          <i class="fas fa-home"></i> Home
      </a>
  </li>
  <li class="nav-item">
      <a class="nav-link" href="About.html">About</a>
  </li>
  <li class="nav-item">
      <a class="nav-link" href="Contect_us.html">Contact Us</a>
  </li>
</ul>
<div class="d-flex" style="padding-left: 650px;">
<li class="login">
                <h5><a class="nav-link" href="login.html">sign in</a></h5>
              </li>
              <li class="nav-item">
                  <h5><a class="nav-link" href="registetion.html">sign up</a></h5>
              </li>



</div>
      `;
    }
  });



  // const toggleButton = document.getElementById('theme-toggle');
  // const body = document.body;
  
  // // Check localStorage for theme preference
  // if (localStorage.getItem('theme') === 'dark') {
  //     body.classList.add('dark-mode');
  // }
  
  // // Toggle Dark/Light Mode
  // toggleButton.addEventListener('click', () => {
  //     body.classList.toggle('dark-mode');
      
  //     // Save theme preference in localStorage
  //     if (body.classList.contains('dark-mode')) {
  //         localStorage.setItem('theme', 'dark');
  //     } else {
  //         localStorage.setItem('theme', 'light');
  //     }
  // });