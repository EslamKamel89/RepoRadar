import type { GithubUser } from "../types/GithubUser";

const baseUrl = import.meta.env.VITE_GITHUB_API_URL;
export const fetchGithubUser = (submittedUsername: string) => {
  return async () => {
    const res = await fetch(`${baseUrl}/users/${submittedUsername}`);
    if (!res.ok) throw new Error("User not found");
    return (await res.json()) as GithubUser;
  };
};
