import { FaGithub } from "react-icons/fa";
import type { GithubUser } from "../types/GithubUser";

const UserCard: React.FC<{ user: GithubUser }> = ({ user }) => {
  return (
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
              </span>
              <span className="text-muted">Repos</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {user.followers}
              </span>
              <span className="text-muted">Followers</span>
            </div>
            <div>
              <span className="font-semibold text-foreground">
                {user.following}
              </span>
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
  );
};

export default UserCard;
