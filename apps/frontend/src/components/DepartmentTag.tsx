import { departmentClass } from "./UserAvatar.js";

export function DepartmentTag({ department }: { department: string }) {
  return <span className={`department-tag ${departmentClass(department)}`}>{department}</span>;
}
