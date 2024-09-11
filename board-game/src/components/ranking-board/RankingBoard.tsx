import React from "react";
import ResultTable from "../shared/ResultTable";
import { useSelector } from "react-redux";
import { useSocket } from "../../hooks/use-socket/useSocket";
const columns = [
  {
    title: "No.",
    dataIndex: "rank",
    key: "rank",
  },
  {
    title: "Name",
    dataIndex: "playerName",
    key: "name",
  },
  {
    title: "Score",
    dataIndex: "points",
    key: "score",
  },
];

const RankingBoard: React.FC = () => {
  const { players } = useSelector((state: any) => {
    return state.player;
  });
  const { isConnected } = useSocket();
  return (
    <React.Fragment>
      <ResultTable
        columns={columns}
        data={
          isConnected
            ? players.map((p: any, i: number) => {
                return { ...p, rank: i + 1 };
              })
            : []
        }
        header="Ranking"
      />
    </React.Fragment>
  );
};

export default RankingBoard;
