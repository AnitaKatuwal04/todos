import NavBar from "./components/NavBar";
import Todos from "./components/Todos";

const App = () => {
  return (
    <div className="mx-32 my-10">
      <NavBar />
      <Todos />
    </div>
  );
};

export default App;
