import Header from "./Header";
import "./Layout.css";
import { Outlet } from "react-router-dom";

const Layout = ({ children, title, ...props }) => {
  return (
    <div className="layout">
      <Header className="layout-header bordered" {...props} />
      <main className="layout-main bordered">
        <Outlet />
      </main>
      <footer className="layout-footer bordered">@ Node-react 2022</footer>
    </div>
  );
};

export default Layout;
