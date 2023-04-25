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
        {moment(new Date()).tz("Europe/Berlin").format("L LTS")}{" "}
      </p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <TableHeadTriggerTooltip
              TooltipString="The name of the user"
              collumnName="Username"
            />
            <TableHeadTriggerTooltip
              TooltipString="The User-id of the User"
              collumnName="Id"
            />
            <TableHeadTriggerTooltip
              TooltipString="The amount of experience the user has"
              collumnName="Exp"
            />
            <TableHeadTriggerTooltip
              TooltipString="The Level of the User"
              collumnName="Level"
            />
            <TableHeadTriggerTooltip
              TooltipString="Their current position on the leaderboard"
              collumnName="Rank"
            />
          </tr>
        </thead>

        <tbody>
          {state.users.map((user)=> {
          return (
                <tr>
                  <td align="center">{user.name} </td>
                  <td align="center">{user.id}</td>
                  <td align="center">{user.experience}</td>
                  <td align="center">{user.level}</td>
                  <td align="center">{user.rank}</td>
                </tr>
              );
          })}
        </tbody>
      </Table>
    </div>
  );
};