// Storing Data in local Stoarge Retrieve the previously stored student list from localStorage

let students = JSON.parse(localStorage.getItem("students")) || [];

// Register New Student
// Displaying Students in the Table

function displayStudents() {
  const list = document.getElementById("studentList");
  list.innerHTML = "";

  // Displaying Students in the Table

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.className = "border-2 hover:bg-lime-400 shadow-lg";
    row.innerHTML = `
      <td class="px-2 py-2">${student.name}</td>
      <td class="px-2 py-2">${student.studentId}</td>
      <td class="px-2 py-2">${student.email}</td>
      <td class="px-2 py-2">${student.contact}</td>
      <td class="px-4 py-4 text-center">
        <button onclick="editStudent(${index})" class="mt-9 bg-lime-400 hover:bg-lime-500 text-black font-semibold px-6 py-1 rounded-2xl shadow-lg shadow-lime-500/50 hover:shadow-lime-400 transition-all duration-300" >Edit</button>
        <button onclick="deleteStudent(${index})" class="mt-9 bg-orange-400 hover:bg-orange-500 text-black font-semibold px-6 py-1 rounded-2xl shadow-lg shadow-orange-500/50 hover:shadow-orange-400 transition-all duration-300">Delete</button>
      </td>
    `;
    list.appendChild(row);
  });
}

// Fields Validation

function validateInputs(name, id, email, contact) {
  const nameRegex = /^[A-Za-z ]+$/;
  const idRegex = /^\d+$/;
  const contactRegex = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    nameRegex.test(name) &&
    idRegex.test(id) &&
    contactRegex.test(contact) &&
    emailRegex.test(email)
  );
}

document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!name || !studentId || !email || !contact)
    return alert("Please fill all fields.");
  if (!validateInputs(name, studentId, email, contact))
    return alert("Invalid input.");

  students.push({ name, studentId, email, contact });
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
  this.reset();
  alert("Record Added Successfully!");
});

// For Deleting Records

function deleteStudent(index) {
  if (confirm("Delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
    alert("Record Deleted Successfully!");
  }
}

//  for editing and updating records

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

displayStudents();
