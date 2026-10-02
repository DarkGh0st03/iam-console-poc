import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserDetailPage } from "./pages/UserDetailPage.js";
import { UserListPage } from "./pages/UserListPage.js";

export function App() {
  return (
    <BrowserRouter>
      <main className="app-shell">
        <Routes>
          <Route path="/" element={<UserListPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
