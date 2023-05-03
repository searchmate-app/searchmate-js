import "./App.css";
import { searchmate } from "searchmate-js";
import "searchmate-js/styles";

function App() {
  return (
    <>
      <div id="search-container" />
      <button
        onClick={() => {
          searchmate({
            appId: "searchmate-react",
            container: "#search-container",
          });
        }}
      >
        Clci
      </button>
    </>
  );
}

export default App;
