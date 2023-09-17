import moment from "moment";
import ReactDOM from "react-dom";
import { apiClient } from "./apiClient";
import { BrowserRouter } from "react-router-dom";
import { Container, Tabs, Tab } from "react-bootstrap";
import { LogStatusTable } from "./components/StatusTable";
import React, { useEffect, useRef, useState } from "react";

import "moment/locale/de";
import { AllLogStates } from "./lib/types";

moment.locale("de");
let i = 0;
let App = () => {
  const parentRef = useRef();
  let [fullstate, setFullState] = useState<AllLogStates>({});

  const poll = async () => {
    console.log("updated full_state");
    let new_state = await apiClient.getState();
    setFullState(new_state);
    i++;
  };

  if (i === 0) {
    poll();
    console.log("polled");
  }
  useEffect(() => {
    let timer = setInterval(poll, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [parentRef]);

  return (
    <div>
      <p></p>
      <Container>
        <h1>DuccBot-Display</h1>
        <h5>These tables show the current ranking of the Users in DuccBot</h5>
        <p></p>
      </Container>
      <Container>
        <Tabs
          defaultActiveKey={Object.keys(fullstate).entries[0]}
          id="Log"
          className="mb-3"
        >
          {Object.keys(fullstate).sort().map((name) => {
            if (name !== "mfst" && name !== "faintmau5 server for tests") {
              return (
                <Tab key={name} eventKey={name} title={name}>
                  <LogStatusTable state={fullstate[name]} />
                </Tab>
              );
            }
          })}
        </Tabs>
      </Container>
    </div>
  );
};

const OuterApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

ReactDOM.render(<OuterApp />, document.getElementById("app-content"));
