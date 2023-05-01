import { TableHeadTriggerTooltip } from "./Tooltip";
import { LogState } from "../lib/types";
import moment from "moment-timezone";
import { Table } from "react-bootstrap";
moment.locale("de");
import React from "react";
import "moment/locale/de";
import "moment/locale/en-gb";

type LogStatusTableProps = {
  state: LogState;
};
export const LogStatusTable = (props: LogStatusTableProps) => {
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
          {props.state?.users.map((user, index) => {
            index += 5;
            return (
              <tr key={index}>
                <td align="justify" key={index + 1}>
                  {user.name}{" "}
                </td>
                <td align="justify" key={index + 2}>
                  {user.id}{" "}
                </td>
                <td align="justify" key={index + 3}>
                  {user.experience}{" "}
                </td>
                <td align="justify" key={index + 4}>
                  {user.level}{" "}
                </td>
                <td align="justify" key={index + 5}>
                  {user.rank}{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
