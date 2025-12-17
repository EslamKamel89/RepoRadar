import { FaUser } from "react-icons/fa";

const RecentUsers: React.FC<{
  recentUsers: string[];
  handleUserSelected: (u: string) => void;
}> = ({ recentUsers, handleUserSelected }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-foreground">Recent Users</h2>

      <ul className="flex flex-wrap gap-2">
        {recentUsers.map((u) => (
          <li key={u}>
            <button
              onClick={() => {
                handleUserSelected(u);
              }}
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground hover:bg-background"
            >
              <FaUser className="text-muted" />
              <span>{u}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentUsers;
