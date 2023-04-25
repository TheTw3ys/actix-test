import moment from "moment";
import "moment/locale/en-gb";
import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

type TableHeadTriggerTooltipProps = {
  tooltipstring: string;
  collumnname: string;
};
type TableLineTriggerTooltipProps = {
  tooltipstring: string;
  lineName: any;
};
export function TableHeadTriggerTooltip(props: TableHeadTriggerTooltipProps) {
  const renderTooltip = (
    <Tooltip id="table-tooltip" {...props}>
      {props.tooltipstring}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 20 }}
      overlay={renderTooltip}
    >
      <th>{props.collumnname}</th>
    </OverlayTrigger>
  );
}
export function TableLineTriggerTooltip(props: TableLineTriggerTooltipProps) {
  const renderTooltip = (
    <Tooltip id="table-tooltip" {...props}>
      {props.tooltipstring}
    </Tooltip>
  );
  moment.locale("en-gb");
  let lineName = props.lineName;
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 20 }}
      overlay={renderTooltip}
    >
      <td>{lineName}</td>
    </OverlayTrigger>
  );
}