import moment from "moment";
import ReactDOM from "react-dom";
import { apiClient } from "./apiClient";
import { BrowserRouter } from "react-router-dom";
import { Container, Tabs, Tab } from "react-bootstrap";
import { VPNStatusTable } from "./components/StatusTable";
import React, { useEffect, useRef, useState } from "react";


import "moment/locale/de";

moment.locale("de");
let i = 0;
var App = () => {
  let [VPNNames, setVPNNames] = useState<Array<string>>([]);
  const parentRef = useRef();
  var pollVPNNames = async () => {
    let names = await apiClient.getVPNNames(); 
    setVPNNames(names);
    console.log(VPNNames.map((logs)=>{return logs}));
    i++;
  };
  if (i == 0){
    pollVPNNames();
  }
  useEffect(() => {
    let timer = setInterval(pollVPNNames, 20000);
    return () => {
      clearTimeout(timer);
    };
  }, [parentRef]
  )
  

  return (
    <div>
      <p></p>
      <Container>
        <h1>DuccBot-Display</h1>
        <h5>These tables show the current ranking of the Users in DuccBot</h5>
        <p></p>
      </Container>
      <Container>
        <Tabs defaultActiveKey={VPNNames[0]} id="VPNLog" className="mb-3">
          {VPNNames.map((name) => {
            if (name !== "mfst" && name !== "faintmau5 server for tests") {
              return (
                <Tab key={name} eventKey={name} title={name}>
                  <VPNStatusTable logName={name} />
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