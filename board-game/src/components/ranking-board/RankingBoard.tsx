import React from "react";
import ResultTable from "../shared/ResultTable";
import { useSelector } from "react-redux";
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

  return (
    <React.Fragment>
      <ResultTable
        columns={columns}
        data={players.map((p: any, i: number) => {
          return { ...p, rank: i + 1 };
        })}
        header="Ranking"
      />
    </React.Fragment>
  );
};

export default RankingBoard;
