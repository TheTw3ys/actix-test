import React, { useState, useRef, useEffect } from "react";
import moment from "moment-timezone";
import { Table } from "react-bootstrap";
import { LogState } from "../lib/types";
import { apiClient } from "../apiClient";
import { TableHeadTriggerTooltip } from "./Tooltip";
import "moment/locale/de";
import "moment/locale/en-gb";
moment.locale("de");

type VPNStatusTableProps = {
  logName: string;
};
let i = 0;
export const VPNStatusTable = (props: VPNStatusTableProps) => {
  const parentRef = useRef();
  let [state, setState] = useState<LogState>({
    updatedAt: new Date(),
    logName: "",
    users: [],
  });
  const poll = async () => {
    const huba = await apiClient.getState();
    
    let new_state: LogState = {
      logName: props.logName,
      updatedAt: new Date(Date.now()),
      users: [],
    };
    Object.keys(huba).map((user_data) => {
      if (user_data === props.logName){
        //console.log(huba)
        new_state = huba[props.logName];
        setState(new_state);}
    })
    i++;
  };
  if (i === 0) {
    poll();
    //console.log("polled once")
  }

  useEffect(() => {
    let timer = setInterval(poll, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, [parentRef]);

  return (
    <div>
      <p>
        This Table was Updated at{" "}
        {moment(new Date()).tz("Europe/Berlin").format("L LTS")}
      </p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <TableHeadTriggerTooltip
              tooltipstring="The name of the user"
              collumnname="Username"
            />
            <TableHeadTriggerTooltip
              tooltipstring="The User-id of the User"
              collumnname="Id"
            />
            <TableHeadTriggerTooltip
              tooltipstring="The amount of experience the user has"
              collumnname="Exp"
            />
            <TableHeadTriggerTooltip
              tooltipstring="The Level of the User"
              collumnname="Level"
            />
            <TableHeadTriggerTooltip
              tooltipstring="Their current position on the leaderboard"
              collumnname="Rank"
            />
          </tr>
        </thead>

        <tbody>
          {state.users.map((user, index)=> {
          index+=5;
          return (
                <tr key={index}>
                  <td align="center" key={index+1}>{user.name} </td>
                  <td align="center" key={index+2}>{user.id} </td>
                  <td align="center" key={index+3}>{user.experience} </td>
                  <td align="center" key={index+4}>{user.level} </td>
                  <td align="center" key={index+5}>{user.rank} </td>
                </tr>
              );
          })}
        </tbody>
      </Table>
    </div>
  );
};