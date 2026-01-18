async function addStudent() {
  const studentId = document.getElementById("studentId").value;
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const message = document.getElementById("message");

  if (!studentId || !name || !course) {
    message.textContent = "All fields are required";
    message.style.color = "red";
    return;
  }

  try {
    const res = await fetch("/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ studentId, name, course })
    });

    const data = await res.json();

    if (res.ok) {
      message.textContent = "Student added successfully";
      message.style.color = "green";
    } else {
      message.textContent = data.error;
      message.style.color = "red";
    }
  } catch (error) {
    message.textContent = "Server error";
    message.style.color = "red";
  }
}
