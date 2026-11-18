export interface UserAvatarProps {
  name: string;
  department: string;
  size?: "small" | "large";
}

/** CSS class of a department: "Human Resources" -> "dept-human-resources". */
export function departmentClass(department: string): string {
  return "dept-" + department.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserAvatar({ name, department, size = "small" }: UserAvatarProps) {
  return (
    <span className={`avatar avatar-${size} ${departmentClass(department)}`} aria-hidden="true">
      {initials(name)}
    </span>
  );
}
