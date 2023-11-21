document.addEventListener("DOMContentLoaded", function () {
  let userForm = document.getElementById("user-form");

  const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
      entries = JSON.parse(entries);
    } else {
      entries = [];
    }
    return entries;
  };

  let userEntries = retrieveEntries();

  const displayEntries = () => {
    const entries = retrieveEntries();
    const rows = entries
      .map((entry) => {
        const name = `<td class="border px-4 py-2">${entry.name}</td>`;
        const email = `<td class="border px-4 py-2">${entry.email}</td>`;
        const password = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dob = `<td class="border px-4 py-2">${entry.dob}</td>`;
        const acceptTerms = `<td class="border px-4 py-2">${entry.acceptTerms}</td>`;

        return `<tr>${name} ${email} ${password} ${dob} ${acceptTerms}</tr>`;
      })
      .join("\n");
    let details = document.getElementById("user-entries");
    details.innerHTML = `<table class="acess" border="2">
        <tr>
          <th class="th">Name</th>
          <th class="th">Email</th>
          <th class="th">Password</th>
          <th class="th">Dob</th>
          <th class="th">Accepted terms?</th>
        </tr>${rows}</table>`;
  };

  const saveUserForm = (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let acceptTerms = document.getElementById("acceptTerms").checked;
    let entry = {
      name,
      email,
      password,
      dob,
      acceptTerms,
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
  };

  userForm.addEventListener("submit", saveUserForm);
  displayEntries();

  function ager(today, dob) {
    var age = today.getFullYear() - dob.getFullYear();
    var month = today.getMonth() - dob.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  let datem = document.getElementById("dob");
  datem.addEventListener("change", () => {
    let [year, month, date] = document.getElementById("dob").value.split("/");
    let dob = new Date(year, month - 1, date);
    let Today = new Date();
    age = ager(Today, dob);
    datem.style.border = "3px solid rgba(0,0,0,0.5)";
    if (age < 18 || age > 55) {
      datem.setCustomValidity("Enter correct age");
      datem.style.border = "2px solid pink";
      return;
    } else {
      datem.setCustomValidity("");
    }
  });

  const email = document.getElementById("email");
  email.addEventListener("input", () => validate(email));

  function validate(ml) {
    if (ml.validity.typeMismatch) {
      ml.setCustomValidity("Check the Email format!");
      ml.reportValidity();
    } else {
      ml.setCustomValidity("");
    }
  }
});
