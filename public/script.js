async function addStudent() {
  const formData = new FormData();

  formData.append("studentId", document.getElementById("studentId").value);
  formData.append("name", document.getElementById("name").value);
  formData.append("course", document.getElementById("course").value);
  formData.append("photo", document.getElementById("photo").files[0]);

  const res = await fetch("/students", {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  document.getElementById("message").textContent = data.message || data.error;
}
