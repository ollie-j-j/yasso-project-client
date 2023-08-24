import './App.css';
import { Button } from "@material-tailwind/react";

function App() {
  return (
    <div className="App">
      <div className="flex w-max gap-4">
        <Button className="font-roboto lowercase" variant="filled">filled</Button>
        <Button className="font-roboto lowercase" variant="gradient">gradient</Button>
        <Button className="font-roboto lowercase" variant="outlined">outlined</Button>
        <Button className="font-roboto lowercase" variant="text">text</Button>
      </div>
    </div>
  );
}

export default App;
