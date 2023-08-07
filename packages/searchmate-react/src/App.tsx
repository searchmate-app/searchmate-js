import "./App.css";
import { Search, useSearch, useShortcut } from "./components";
import { APP_ID } from "./consts";

function App() {
  const { isOpen, onOpen, onClose } = useSearch();
  useShortcut({
    callback: onOpen,
    isOpen,
    key: "k",
    withCtrl: true,
  });
  useShortcut({
    callback: onOpen,
    isOpen,
    key: "/",
  });

  return (
    <>
      <button onClick={onOpen} type="submit">
        Open search
      </button>
      <Search
        appId={APP_ID}
        isOpen={isOpen}
        onClose={onClose}
        urlPrefix="https://tailwindcss.com/docs"
      />
    </>
  );
}

export default App;
