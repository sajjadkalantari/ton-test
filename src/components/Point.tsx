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
          <FontAwesomeIcon icon={faTrophy} color="goldenrod" />
        </TaskIcon>
        <DescriptionColumn>
          <p>{description}</p>
        </DescriptionColumn>
        <BadgeColumn>
          <b style={{color:"goldenrod", fontSize:"larger"}}>{points}</b>
        </BadgeColumn>
      </PointContainer>
    </Card>
  );
}
