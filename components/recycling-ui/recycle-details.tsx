import React from "react";

type RecycleDetailsProps = {
  action: string;
  proofStatus?: string;
  hash?: string;
  proof_extracts?: string;
  reasons: string[];
};

const RecycleDetails = ({
  action,
  proofStatus,
  hash,
  proof_extracts,
  reasons,
}: RecycleDetailsProps) => {
  return (
    <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center mt-4">
      <h2 className="capitalize">
        Action: <span className="text-green-500">{action}</span>
      </h2>
      {proofStatus && <p className="text-sm">Proof: {proofStatus}</p>}

      {hash && (
        <p className="text-sm">
          TX Hash:{" "}
          <a
            className="link"
            href={`https://testnet.monadexplorer.com/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hash.slice(0, 6)}...{hash.slice(-4)}
          </a>
        </p>
      )}

      {/* {reasons.length > 0 && (
        <div className="text-sm w-96">
          <p>Details:</p>
          <ul className="list-disc list-inside">
            {reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default RecycleDetails;
