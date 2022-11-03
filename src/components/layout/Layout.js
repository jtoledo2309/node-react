import Header from "./Header";

const Layout = ({ children, title }) => {
  return (
    <div>
      <Header />
      <main>
        <h2>{title}</h2>
        <section>{children}</section>
      </main>
      <footer>@ Node-react 2022</footer>
    </div>
  );
};

export default Layout;
