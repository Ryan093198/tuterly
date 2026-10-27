// Logged-in / account surfaces keep Inter (see .app-ui in globals.css).
export default function Layout({ children }) {
  return <div className="app-ui contents">{children}</div>;
}
