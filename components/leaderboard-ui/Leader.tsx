import React from "react";

interface Account {
  actionType: string;
  amount: string;
  id: string;
  timestamp: string;
  user: string;
}

type LeaderProps = {
  account: Account | undefined;
  total_proof: number;
};

interface LeaderComponentProps {
  user: LeaderProps;
  index: number;
}

const Leader: React.FC<LeaderComponentProps> = ({ user, index }) => {
  const { account, total_proof } = user;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        {account?.user.slice(0, 6)}...
        {account?.user.slice(account?.user.length - 5, account?.user.length)}
      </td>
      <td>{total_proof * 100}</td>
      <td>{total_proof}</td>
    </tr>
  );
};

export default Leader;
