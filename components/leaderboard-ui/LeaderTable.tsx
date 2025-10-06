"use client";
import { useRewardDistributor } from "@/hooks/useEnvio";
import React, { useEffect, useState } from "react";
import Leader from "./Leader";

interface Account {
  actionType: string;
  amount: string;
  id: string;
  timestamp: string;
  user: string;
}

interface Leader {
  account: Account | undefined;
  total_proof: number;
}
interface UserCounts {
  [address: string]: number;
}

const LeaderTable = () => {
  const [leaderboard, setLeaderboard] = useState<Leader[]>([]);
  const { data, isLoading } = useRewardDistributor();

  useEffect(() => {
    if (data) {
      const userCounts: UserCounts = data.reduce(
        (accumulator: UserCounts, currentItem: Account) => {
          const address: string = currentItem.user;
          accumulator[address] = (accumulator[address] || 0) + 1;
          return accumulator;
        },
        {}
      );

      const leaders = Object.entries(userCounts)
        .map(([address, count]) => {
          const user = data.find((u: Account) => u.user === address);
          return {
            account: user as Account,
            total_proof: count as number,
          };
        })
        .sort((a, b) => b.total_proof - a.total_proof);

      setLeaderboard(leaders.slice(0, 10));
    }
  }, [data]);
  return isLoading ? (
    <div className="w-full flex justify-center mt-44">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  ) : (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full">
      <table className="table bg-base-300">
        {/* head */}
        <thead className="bg-base-200">
          <tr>
            <th>Rank</th>
            <th>Smart Address</th>
            <th>ECO Earned</th>
            <th>Proof submitted</th>
          </tr>
        </thead>
        <tbody className="">
          {leaderboard &&
            leaderboard.map((leader, index) => (
              <Leader key={leader?.account?.id} user={leader} index={index} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderTable;
