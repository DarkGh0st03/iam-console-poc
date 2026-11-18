import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserDetailPage } from "./pages/UserDetailPage.js";
import { UserListPage } from "./pages/UserListPage.js";

export function App() {
  return (
    <BrowserRouter>
      <header className="topbar">
        <div className="topbar-inner">
          <span className="brand-mark" aria-hidden="true">✦</span>
          <span className="brand-name">IAM Console</span>
          <span className="brand-tag">Identity &amp; Access</span>
        </div>
      </header>
      <main className="app-shell">
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
