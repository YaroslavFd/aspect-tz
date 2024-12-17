import React from "react";
import { ServerIcon } from "./ui/icons/Servericon";

interface ServersListProps {
  servers: string;
}

const ServersList: React.FC<ServersListProps> = ({ servers }) => {
  return (
    <div className="servers-list">
      <label className="label">Cерверы</label>
      <div>
        <ServerIcon />
        {servers || "Нет доступных серверов"}
      </div>
    </div>
  );
};

export default ServersList;
