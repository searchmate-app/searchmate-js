import "./App.css";
import "searchmate-js/styles";
import { useSearch, Search } from "./components";
import { APP_ID } from "./consts";

function App() {
  const { isOpen, onOpen } = useSearch();
  return (
    <>
      <button onClick={onOpen} type="submit">
        Open search
      </button>
      <Search appId={APP_ID} isOpen={isOpen} />
    </>
  );
}

export default App;
