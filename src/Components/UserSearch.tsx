// src/components/UserSearch.tsx
import { useQuery } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { fetchGithubUser } from "../api/github";
import type { GithubUser } from "../types/GithubUser";
import UserCard from "./UserCard";

const UserSearch: React.FC = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");

  const {
    data: user,
    isError,
    error,
    isLoading,
  } = useQuery<GithubUser>({
    queryKey: ["users", submittedUsername],
    queryFn: fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername,
    staleTime: 1000 * 60 * 5,
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittedUsername(username.trim());
  };

  return (
    <div className="space-y-6">
      <form onSubmit={submit} className="flex gap-3">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 rounded-md border border-border bg-surface px-4 py-2 text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-hover disabled:opacity-50"
        >
          Search
        </button>
      </form>

      {isLoading && <div className="text-sm text-muted">Loading…</div>}

      {isError && (
        <div className="rounded-md border border-error bg-surface px-4 py-2 text-sm text-error">
          {error.message ?? "Sorry something went wrong"}
        </div>
      )}

      {user && <UserCard user={user} />}
    </div>
  );
};

export default UserSearch;
