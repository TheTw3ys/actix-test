import React, { useState, useRef, useEffect } from "react";
import moment from "moment-timezone";
import { Table } from "react-bootstrap";
import { AllUsers, FullCurrentState } from "../lib/types";
import { apiClient } from "../apiClient";
import { TableHeadTriggerTooltip } from "./Tooltip";
import "moment/locale/de";
import "moment/locale/en-gb";
moment.locale("de");

type VPNStatusTableProps = {
  logName: string;
};
let i  = 0;
export const VPNStatusTable = (props: VPNStatusTableProps) => {
  const parentRef = useRef();
  let [state, setState] = useState<FullCurrentState>();
  state = {
    users: {},
    logname: props.logName,
    updatedAt: new Date(Date.now())

  };
  const poll = async () => {
    const huba = await apiClient.getState();
    setState(huba[props.logName])
  };
  if (i === 0) {
    console.log("polled once")
    poll();
  }

  useEffect(() => {
    let timer = setInterval(poll, 10000);
    i++
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
          {Object.keys(state.users).map((clientName) => {
            if (state) {
            const client = state.users[clientName];

            return (
              <tr>
                <td align="center">{client.name}</td>
                <td align="center">{client.id}</td>
                <td align="center">{client.experience}</td>
                <td align="center">{client.level}</td>
                <td align="center">{client.rank}</td>
              </tr>
            );
          }})}
        </tbody>
      </Table>
    </div>
  );
};