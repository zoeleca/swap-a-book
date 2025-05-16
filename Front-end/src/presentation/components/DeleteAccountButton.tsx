import { useState } from "react";

const DeleteAccountButton = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch("/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.status === 204) {
        alert("Your account has been deleted.");
        window.location.href = "/login";
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete account.");
      }
    } catch (err) {
      setError("An error occurred while deleting your account.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mb-10 text-center px-4">
      <button
        onClick={handleDeleteAccount}
        disabled={isDeleting}
        className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-900"
      >
        {isDeleting ? "Deleting..." : "Delete Account"}
      </button>
      {error && <p className="text-amber-500 mt-2">{error}</p>}
    </div>
  );
};

export default DeleteAccountButton;
