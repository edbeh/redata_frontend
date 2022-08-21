import { Button } from "components";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col space-y-2 p-4">
      <Button>Learn react</Button>
      <Button variant="secondary">Register now</Button>
    </div>
  );
}

export default App;
