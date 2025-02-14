"use client";

import React, { useEffect } from "react";

type PropsError = {
  error: Error & { digest?: () => void };
  reset: () => void;
};

const Error = ({ error, reset }: PropsError) => {
  useEffect(() => {
    // Log the error for debugging or tracking purposes
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! ⚽</h1>
        <p className="text-lg text-gray-700 mb-4">
          On dirait qu'une erreur s'est produite. Pas de panique, on va régler ça !
        </p>
        <p className="text-sm text-gray-500 mb-6">
          {"Une erreur imprévue est survenue."}
        </p>
        <button
          onClick={reset}
          className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition"
        >
          Réessayer
        </button>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Si ce problème persiste,{" "}
            <a
              href="mailto:support@footballapp.com"
              className="text-blue-500 underline hover:text-blue-600"
            >
              contactez notre support
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Error;
