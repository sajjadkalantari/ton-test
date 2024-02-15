import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Ellipsis,
  Button,
} from "./styled/styled";

import WebApp from '@twa-dev/sdk';
import styled from 'styled-components';
import { faLock, faCheck, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PointProps {
  description: string;
  points: number;
}

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #d2f5d3;
  border-radius: 5px;
`;

const TaskIcon = styled.div`
  flex: 1;
  text-align: center;
`;

const DescriptionColumn = styled.div`
  flex: 4;
  padding: 0 10px;
`;

const UrlLink = styled.a`
  flex: 4;
  padding: 0 10px;
  color: #007bff;
  text-decoration: none;
`;

const BadgeColumn = styled.div`
  flex: 1;
  text-align: center;
`;

const Badge = styled.div`
  background-color: #007bff;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
`;
export function Point({ description, points }: PointProps) {

  return (
    <Card>
      <TaskContainer>
        <TaskIcon>
          <FontAwesomeIcon icon={faTrophy} color="#007bff" />
        </TaskIcon>
        <DescriptionColumn>
          <p>{description}</p>
        </DescriptionColumn>
        <BadgeColumn>
          <b>{points}</b>
        </BadgeColumn>
      </TaskContainer>
    </Card>
  );
}
