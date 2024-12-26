const addCourse = async (event) => {
    event.preventDefault();
    const form = document.getElementById("addCourseForm");
    const formData = new FormData(form);

    // Fetch image file from the form data
    const imageFile = formData.get("image");

    if (imageFile) {
        try {
            // Create a new FormData for the image upload
            const imageData = new FormData();
            imageData.append("key", "fe207de422fe78fbbe0d4e9ff7e2d6e2");
            imageData.append("image", imageFile);

            // Upload image to imageBB
            const imageBBResponse = await fetch("https://api.imgbb.com/1/upload", {
                method: "POST",
                body: imageData,
            });

            if (!imageBBResponse.ok) {
                throw new Error("Image upload failed.");
            }

            const imageBBData = await imageBBResponse.json();
            const imageURL = imageBBData.data.url; // Get the uploaded image URL

            // Replace the image field in the form data with the URL
            formData.set("image", imageURL);

            // Submit the updated form data to your server
            const response = await fetch("http://127.0.0.1:8000/Course/list/", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const data = await response.json();
            console.log("Course added:", data);
            alert("Course added successfully");
            form.reset();
        } catch (error) {
            console.error("Error:", error);
            alert(`Course added unsuccessfully: ${error.message}`);
        }
    } else {
        alert("Please upload an image.");
    }
};
