import React from "react";

type RecycleDetailsProps = {
  is_recycle: string;
  confidence?: number;
  hash?: string;
  proof_extracts?: string;
  reasons: string[];
};

const RecycleDetails = ({
  is_recycle,
  confidence,
  hash,
  proof_extracts,
  reasons,
}: RecycleDetailsProps) => {
  return (
    <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center mt-4">
      <h2 className={is_recycle === "yes" ? "text-green-500" : "text-red-500"}>
        {is_recycle === "yes" ? "Recycling successful!" : "Recycling failed."}
      </h2>
      {confidence && <p className="text-sm">Confidence: {confidence}</p>}

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
