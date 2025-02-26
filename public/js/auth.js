const loginForm = document.querySelector(".login");
const SignupForm = document.querySelector(".signup");

function toggleForm() {
  document.getElementById("login-container").style.display =
    document.getElementById("login-container").style.display === "none"
      ? "block"
      : "none";
  document.getElementById("signup-container").style.display =
    document.getElementById("signup-container").style.display === "none"
      ? "block"
      : "none";
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  const email = data.email;
  const password = data.password;

  checkIfExists(email, password).then((isValid) => {
    console.log(isValid ? "Login successful" : "Invalid Credentials");
    if (!isValid)
      alert("Invalid Credentials. Either username/email or password is wrong");
    else {
      LoggedIn = true;
      localStorage.setItem("auth", JSON.stringify({auth:true,user:user}))
      window.location.href = "index.html";
    }
    return;
  });
});

SignupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  const email = data.email;
  const username = data.username;
  const password = data.password;

  if (!(await isUnique(email))) {
    alert("Email alerady Exists");
    return;
  }
  if (!(await isUnique(username))) {
    alert("Username already Exists");
    return;
  }

  addSignUpData(username, email, password);
  toggleForm();
});

const heading = document.querySelector("h1");
heading.addEventListener("click", () => {
  window.location.href = "index.html";
});
