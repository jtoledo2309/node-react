import Header from "./Header";
import "./Layout.css";

const Layout = ({ children, title, ...props }) => {
  return (
    <div className="layout">
      <Header className="layout-header bordered" {...props} />
      <main className="layout-main bordered">
        <h2 className="layout-title bordered">{title}</h2>
        <section className="layout-content">{children}</section>
      </main>
      <footer className="layout-footer bordered">@ Node-react 2022</footer>
    </div>
  );
};

export default Layout;
