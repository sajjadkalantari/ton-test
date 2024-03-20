import {
  Card,
  TaskIcon,
  DescriptionColumn,
  BadgeColumn,
  PointContainer,
  PointIcon,
} from "./styled/styled";
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PointProps {
  description: string;
  points: number;
}

export function Point({ description, points }: PointProps) {

  return (
    <Card>
      <PointContainer>
        <PointIcon>
          <img width={48} src="./2.svg" alt="point" />
        </PointIcon>
        <DescriptionColumn>
          <span style={{ fontSize: "12px", color: "#5A5A5A", marginBottom: "5px" }}>Point balance</span>
          <span style={{ fontSize: "14px" }}>{description}</span>
        </DescriptionColumn>
        <BadgeColumn>
          <b style={{ color: "#02B1AA", fontSize: "14px", marginRight: "5px" }}>{points}</b> <img width={14} src="./gem.svg" alt="" />
        </BadgeColumn>
      </PointContainer>
    </Card>
  );
}
