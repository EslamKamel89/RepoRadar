// src/components/UserSearch.tsx
import { useQuery } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { FaGithub } from "react-icons/fa";
import type { GithubUser } from "../types/GithubUser";

const baseUrl = import.meta.env.VITE_GITHUB_API_URL;

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
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/users/${submittedUsername}`);
      if (!res.ok) throw new Error("User not found");
      return (await res.json()) as GithubUser;
    },
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

      {user && (
        <div className="rounded-lg border border-border bg-surface p-6">
          <div className="flex gap-6">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="h-24 w-24 rounded-full border border-border"
            />

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground">
                {user.name ?? user.login}
              </h2>
              <p className="text-muted">@{user.login}</p>

              {user.bio && (
                <p className="mt-3 text-sm text-foreground">{user.bio}</p>
              )}

              <div className="mt-4 flex gap-6 text-sm">
                <div>
                  <span className="font-semibold text-foreground">
                    {user.public_repos}
                  </span>{" "}
                  <span className="text-muted">Repos</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    {user.followers}
                  </span>{" "}
                  <span className="text-muted">Followers</span>
                </div>
                <div>
                  <span className="font-semibold text-foreground">
                    {user.following}
                  </span>{" "}
                  <span className="text-muted">Following</span>
                </div>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex  items-center justify-start space-x-1 text-sm font-medium text-accent hover:underline"
              >
                <FaGithub />
                <div>View on GitHub →</div>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
