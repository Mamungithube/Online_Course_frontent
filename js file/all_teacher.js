async function fetchTeacherList() {
    try {
        const response = await fetch("https://online-course-rose.vercel.app/Teacher/list/");

        if (!response.ok) {
            throw new Error(`Failed to fetch the teacher list: ${response.statusText}`);
        }

        const teachers = await response.json();
        console.log("Fetched Teachers:", teachers);

        const teacherList = document.getElementById("teacherList");
        teacherList.innerHTML = "";

        teachers.forEach(teacher => {
            const teacherCard = document.createElement("div");
            teacherCard.className = "teacher-card";
            teacherCard.innerHTML = `
            <img src="${teacher.image}" class="card-img-top">
            <h2>${teacher.user}</h2>
                <p><b>Catagory:</b> ${teacher.Catagory}</p>
                <p><b>Contact me(Meet Link):</b> ${teacher.meet_link}</p>
            `;
            teacherList.appendChild(teacherCard);
        });

    } catch (error) {
        console.error("Fetch Error:", error.message);
    }
}

fetchTeacherList();
