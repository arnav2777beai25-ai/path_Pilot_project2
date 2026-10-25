# PathPilot

PathPilot is a student productivity and career-preparation platform.

## Current MVP

- Responsive landing page
- Signup/Login demo using localStorage
- Dashboard
- Study Planner
- DSA Tracker
- Notes
- Profile
- Dark mode
- Responsive mobile navigation
- Persistent frontend data using localStorage
- Export and restore study data with a versioned JSON backup (excludes passwords and login credentials)
- Internship application pipeline
- Offline AI coach that uses your study data (optional live API key)
- Bookmarkable dashboard pages (`dashboard.html#dsa`)
- Command palette (Ctrl/Cmd K)

## Tech

HTML5, CSS3, JavaScript (ES6+)

## Data and privacy notes

PathPilot is a frontend demo. Login/signup is browser-local and is not production authentication. Study data is stored in the current browser. Use Profile → Backup & portability to export a JSON backup or restore one. Keep backup files private because they can contain personal study notes and plans.

## Roadmap

1. React component migration
2. Next.js frontend
3. Node.js/Express backend
4. PostgreSQL database
5. Real authentication
6. Resume builder
7. AI resume review
8. AI study/career assistant
9. Internship tracker
10. Deployment

## Run

Open `index.html` in a browser, or use VS Code Live Server.
