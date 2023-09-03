import React from "react";

export default function AuthorCard({ author }) {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Autor do pedido</h2>
      <p>ID: {author.id}</p>
      {/* Render other author details */}
    </div>
  );
}
