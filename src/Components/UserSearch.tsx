import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
const baseUrl = import.meta.env.VITE_GITHUB_API_URL;
const UserSearch: React.FC = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/users/${submittedUsername}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Enter Github username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
      <button type="submit">Search </button>
    </div>
  );
};

export default UserSearch;
