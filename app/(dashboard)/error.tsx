"use client";

import React, { useEffect } from "react";

const Error = ({ error, reset }: { error: string; reset: () => void }) => {
  useEffect(() => {
    console.log(error);
  }, []);
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
