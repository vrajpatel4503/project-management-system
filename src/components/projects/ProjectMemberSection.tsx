import ProjectMemberCard from "./ProjectMemberCard";
import { TechnicalPositionType } from "@/types/employee.types";
import { Employee } from "@/types/employee.types";

type ProjectMemberSection = {
  title: string;
  members: Employee[];
  memberType: TechnicalPositionType;
  onAdd?: (type: TechnicalPositionType) => void;
  onRemove?: (
    memberId: string,
    memberType: TechnicalPositionType
  ) => void;

};

export default function ProjectMemberSection({
  title,
  memberType,
  members,
  onAdd,
  onRemove,
}: ProjectMemberSection) {
  return (
    <ProjectMemberCard
      title={title}
      members={members}
      memberType={memberType}
      onAdd={onAdd}
      onRemove={onRemove}
    />
  );
}
