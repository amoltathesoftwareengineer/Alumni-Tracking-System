
import { useEffect, useState } from "react";

const API = "http://localhost:5000/api";

export default function App() {
  const [token, setToken] = useState(
    () => localStorage.getItem("alumni_token") || ""
  );
  const [user, setUser] = useState(null);
  const [alumni, setAlumni] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [profile, setProfile] = useState({
    name: "",
    graduationYear: "",
    degree: "",
    company: "",
    jobTitle: "",
    location: "",
    bio: ""
  });

  async function request(path, options = {}) {
    const response = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
      }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  }

  useEffect(() => {
    if (token) {
      loadProfile();
    }
  }, [token]);

  async function loadProfile() {
    try {
      const data = await request("/alumni/me");
      setUser(data);
      setProfile({
        name: data.name || "",
        graduationYear: data.graduationYear || "",
        degree: data.degree || "",
        company: data.company || "",
        jobTitle: data.jobTitle || "",
        location: data.location || "",
        bio: data.bio || ""
      });
      setMessage("");
      await loadAlumni();
    } catch (error) {
      logout();
      setMessage(error.message);
    }
  }

  async function loadAlumni(query = search) {
    try {
      const data = await request(
        `/alumni?search=${encodeURIComponent(query)}`
      );
      setAlumni(data);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleAuth(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const endpoint =
        mode === "login" ? "/auth/login" : "/auth/register";

      const data = await request(endpoint, {
        method: "POST",
        body: JSON.stringify(form)
      });

      if (mode === "register") {
        setMessage("Registration successful. Please log in.");
        setMode("login");
        setForm({ name: "", email: form.email, password: "" });
      } else {
        localStorage.setItem("alumni_token", data.token);
        setToken(data.token);
        setUser(data.user);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile(event) {
    event.preventDefault();
    setMessage("");

    try {
      const data = await request("/alumni/me", {
        method: "PUT",
        body: JSON.stringify({
          ...profile,
          graduationYear: profile.graduationYear
            ? Number(profile.graduationYear)
            : null
        })
      });

      setUser(data.user);
      setMessage("Profile updated successfully.");
      await loadAlumni();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function logout() {
    localStorage.removeItem("alumni_token");
    setToken("");
    setUser(null);
    setAlumni([]);
  }

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function updateProfile(event) {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value
    });
  }

  if (!token) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <div className="brand-icon">A</div>
          <p className="eyebrow">YOUR PROFESSIONAL COMMUNITY</p>
          <h1>Alumni Tracking System</h1>
          <p className="muted">
            Connect with alumni, share your journey and grow together.
          </p>

          <div className="tabs">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
            >
              Login
            </button>
            <button
              className={mode === "register" ? "active" : ""}
              onClick={() => {
                setMode("register");
                setMessage("");
              }}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuth}>
            {mode === "register" && (
              <label>
                Full name
                <input
                  name="name"
                  value={form.name}
                  onChange={updateForm}
                  placeholder="Enter your full name"
                  required
                />
              </label>
            )}

            <label>
              Email address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateForm}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={updateForm}
                placeholder="Minimum 8 characters"
                minLength={8}
                required
              />
            </label>

            <button className="primary-button" disabled={loading}>
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Login to dashboard"
                : "Create account"}
            </button>
          </form>

          {message && <p className="message">{message}</p>}
          <p className="auth-footer">
            Build connections. Share opportunities. Stay connected.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-icon small">A</span>
          Alumni Connect
        </a>

        <div className="user-menu">
          <span>{user?.name || "Alumni"}</span>
          <button className="secondary-button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <section className="welcome" id="home">
        <div>
          <p className="eyebrow">ALUMNI COMMUNITY</p>
          <h1>Welcome back, {user?.name || "Alumni"}!</h1>
          <p>
            Manage your professional profile and discover fellow alumni.
          </p>
        </div>
        <div className="welcome-symbol">✦</div>
      </section>

      {message && <p className="message dashboard-message">{message}</p>}

      <section className="stats">
        <article className="stat-card">
          <span className="stat-icon">👥</span>
          <p>Alumni directory</p>
          <h2>{alumni.length}</h2>
          <span className="muted">Profiles displayed</span>
        </article>

        <article className="stat-card">
          <span className="stat-icon">🎓</span>
          <p>Graduation year</p>
          <h2>{profile.graduationYear || "—"}</h2>
          <span className="muted">Your academic journey</span>
        </article>

        <article className="stat-card">
          <span className="stat-icon">💼</span>
          <p>Current company</p>
          <h2 className="company-value">
            {profile.company || "Not added"}
          </h2>
          <span className="muted">Your career information</span>
        </article>
      </section>

      <div className="content-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">YOUR INFORMATION</p>
              <h2>My Profile</h2>
            </div>
            <span className="profile-badge">Alumni</span>
          </div>

          <form className="profile-form" onSubmit={saveProfile}>
            <label>
              Full name
              <input
                name="name"
                value={profile.name}
                onChange={updateProfile}
                required
              />
            </label>

            <label>
              Graduation year
              <input
                type="number"
                name="graduationYear"
                min="1950"
                max="2100"
                value={profile.graduationYear}
                onChange={updateProfile}
                placeholder="e.g. 2022"
              />
            </label>

            <label>
              Degree
              <input
                name="degree"
                value={profile.degree}
                onChange={updateProfile}
                placeholder="e.g. MBA, B.Tech"
              />
            </label>

            <label>
              Job title
              <input
                name="jobTitle"
                value={profile.jobTitle}
                onChange={updateProfile}
                placeholder="e.g. Software Engineer"
              />
            </label>

            <label>
              Company
              <input
                name="company"
                value={profile.company}
                onChange={updateProfile}
                placeholder="Your company"
              />
            </label>

            <label>
              Location
              <input
                name="location"
                value={profile.location}
                onChange={updateProfile}
                placeholder="City, country"
              />
            </label>

            <label className="full-width">
              About me
              <textarea
                name="bio"
                value={profile.bio}
                onChange={updateProfile}
                placeholder="Tell the community about yourself..."
                rows={3}
              />
            </label>

            <button className="primary-button full-width">
              Save profile
            </button>
          </form>
        </section>

        <section className="panel directory-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">BUILD CONNECTIONS</p>
              <h2>Alumni Directory</h2>
            </div>
            <span className="count-badge">{alumni.length}</span>
          </div>

          <form
            className="search-form"
            onSubmit={(event) => {
              event.preventDefault();
              loadAlumni(search);
            }}
          >
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, company, degree..."
              aria-label="Search alumni"
            />
            <button className="primary-button">Search</button>
          </form>

          <div className="alumni-list">
            {alumni.length === 0 ? (
              <div className="empty-state">
                <span>👥</span>
                <h3>No alumni found</h3>
                <p>Try another search or check back later.</p>
              </div>
            ) : (
              alumni.map((person) => (
                <article className="alumni-card" key={person._id}>
                  <div className="avatar">
                    {(person.name || "A").charAt(0).toUpperCase()}
                  </div>
                  <div className="alumni-info">
                    <h3>{person.name}</h3>
                    <p>
                      {person.jobTitle || "Alumni"}
                      {person.company ? ` · ${person.company}` : ""}
                    </p>
                    <span>
                      {[person.degree, person.graduationYear, person.location]
                        .filter(Boolean)
                        .join(" · ") || "Profile information not added"}
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>

      <footer className="footer">
        Alumni Tracking System · Connect. Grow. Succeed.
      </footer>
    </main>
  );
}
