import {
  Card,
  TaskIcon,
  DescriptionColumn,
  BadgeColumn,
  PointContainer,
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
        <TaskIcon>
          <img width={40} style={{marginLeft:"10px"}} src="./god-point.png" alt="point" />
        </TaskIcon>
        <DescriptionColumn>
          <p style={{ textAlign: "center", fontSize: "small" }}>{description}</p>
        </DescriptionColumn>
        <BadgeColumn>
          <b style={{ color: "goldenrod", fontSize: "medium" }}>{points}</b>
        </BadgeColumn>
      </PointContainer>
    </Card>
  );
}
