/* PathPilot auth — shared by login.html and signup.html.
   Stores every account in a single array under "pathpilot-users" so more
   than one person can sign up on the same browser, then sets
   "pathpilot-current-user" + "pathpilotLoggedIn" for js/app.js to read. */

document.addEventListener("DOMContentLoaded", () => {
  const msg = document.getElementById("formMessage");

  function setMessage(text, isError = true) {
    if (!msg) return;
    msg.textContent = text;
    msg.style.color = isError ? "var(--danger)" : "var(--success)";
  }

  function getUsers() {
    try { return JSON.parse(localStorage.getItem("pathpilot-users")) || []; }
    catch { return []; }
  }
  function saveUsers(users) {
    localStorage.setItem("pathpilot-users", JSON.stringify(users));
  }
  function startSession(user) {
    localStorage.setItem("pathpilot-current-user", JSON.stringify({ name: user.name, email: user.email }));
    localStorage.setItem("pathpilotLoggedIn", "true");
    sessionStorage.setItem("pathpilot-entry-splash", "1");
  }
  async function hashPassword(password) {
    const data = new TextEncoder().encode("pathpilot-v1:" + password);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
  }

  document.querySelectorAll(".show-password").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
      btn.textContent = input.type === "password" ? "Show" : "Hide";
    });
  });

  const login = document.getElementById("loginForm");
  if (login) {
    login.addEventListener("submit", async e => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      const hashed = await hashPassword(password);
      const users = getUsers();
      const user = users.find(u => u.email === email);
      const ok = user && (user.passwordHash === hashed || user.password === password);
      if (!ok) { setMessage("Incorrect email or password."); return; }
      if (user.password && user.passwordHash !== hashed) {
        user.passwordHash = hashed;
        delete user.password;
        saveUsers(users);
      }
      startSession(user);
      setMessage("Login successful. Redirecting…", false);
      setTimeout(() => location.href = "dashboard.html", 200);
    });
  }

  const signup = document.getElementById("signupForm");
  if (signup) {
    signup.addEventListener("submit", async e => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("signupEmail").value.trim().toLowerCase();
      const password = document.getElementById("signupPassword").value;
      const confirm = document.getElementById("confirmPassword").value;

      if (password !== confirm) { setMessage("Passwords do not match."); return; }
      if (password.length < 6) { setMessage("Password must be at least 6 characters."); return; }

      const users = getUsers();
      if (users.some(u => u.email === email)) {
        setMessage("An account with this email already exists."); return;
      }
      const user = { name, email, passwordHash: await hashPassword(password) };
      users.push(user);
      saveUsers(users);
      startSession(user);
      setMessage("Account created. Redirecting…", false);
      setTimeout(() => location.href = "dashboard.html", 200);
    });
  }

  const guestLogin = document.getElementById("guestLogin");
  if (guestLogin) {
    guestLogin.addEventListener("click", () => {
      startSession({ name: "Guest", email: "guest@pathpilot.local" });
      location.href = "dashboard.html";
    });
  }

  const forgot = document.getElementById("forgotPassword");
  if (forgot) {
    forgot.addEventListener("click", e => {
      e.preventDefault();
      setMessage("Password reset is not connected yet.");
    });
  }
});
