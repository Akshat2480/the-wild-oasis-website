import React from "react";
import Spinner from "@/app/_components/Spinner";

function loading() {
  return (
    <div className="grid justify-center items-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading Cabins Data</p>
    </div>
  );
}

export default loading;
