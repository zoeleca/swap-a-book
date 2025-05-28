import React from "react";

interface DeleteBookButtonProps {
  bookId: string;
  onDelete: (id: string) => void;
}

const DeleteBookButton: React.FC<DeleteBookButtonProps> = ({bookId, onDelete}) => {
  const handleClick = () => {
    if (confirm("Are you sure you want to delete this book?")) {
      onDelete(bookId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 bg-amber-700 text-white px-3 py-1 rounded hover:bg-amber-900 transition"
    >
      Delete
    </button>
  );
};

export default DeleteBookButton;
