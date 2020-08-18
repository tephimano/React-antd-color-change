import React from "react";
import "./App.css";
//import Login from "./Login.js";
import DisplayChart from "./CallingSameQueryAgainOnButtonClick";
import { ReactQueryDevtools } from "react-query-devtools";
import DependantQueries from "./DependantQueries";
import { ReactQueryConfigProvider } from "react-query";
import ScoreChart from "../ScoreChart";

//import LoginClass from "./LoginClass";

const queryConfig = {
  queries: { refetchOnWindowFocus: false, staleTime: 2000, retry: 0 },
};
function App() {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <ScoreChart />
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryConfigProvider>
  );
}

export default App;
