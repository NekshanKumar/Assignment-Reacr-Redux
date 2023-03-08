import { User } from "./features/User/User";

function App() {
  return (
    <>
      <nav className="navbar is-info">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">React.JS Redux Toolkit with Typescript CRUD User Dashboard</a>
        </div>
      </nav>
      <div className="container is-max-desktop">
        <User />
      </div>
    </>
  );
}

export default App;
