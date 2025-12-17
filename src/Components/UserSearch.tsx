import { useQuery } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { FaX } from "react-icons/fa6";
import { fetchGithubUser } from "../api/github";
import type { GithubUser } from "../types/GithubUser";
import RecentUsers from "./RecentUsers";
import UserCard from "./UserCard";

const UserSearch: React.FC = () => {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");
  const [recentUsers, setRecentUsers] = useState<string[]>([]);

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
    const trimmed = username.trim();
    if (!trimmed) return;

    setSubmittedUsername(trimmed);
    setRecentUsers((prev) => {
      const updated = [trimmed, ...prev.filter((u) => u !== trimmed)];
      return updated.slice(0, 5);
    });
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={submit}
        className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-4 py-2 pr-10 text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
          />

          {username && (
            <button
              type="button"
              onClick={() => setUsername("")}
              title="Clear search input"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:bg-surface hover:text-foreground"
            >
              <FaX size={14} />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-hover disabled:opacity-50"
        >
          Search
        </button>
      </form>

      {isLoading && (
        <div className="rounded-md border border-border bg-surface px-4 py-3 text-sm text-muted">
          Loading user…
        </div>
      )}

      {isError && (
        <div className="rounded-md border border-error bg-surface px-4 py-3 text-sm text-error">
          {error.message ?? "Sorry something went wrong"}
        </div>
      )}

      {user && <UserCard user={user} />}

      {recentUsers.length > 0 && (
        <RecentUsers
          recentUsers={recentUsers}
          handleUserSelected={(u) => {
            setUsername(u);
            setSubmittedUsername(u);
          }}
        />
      )}
    </div>
  );
};

export default UserSearch;
