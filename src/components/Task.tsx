import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Ellipsis,
  Button,
} from "./styled/styled";

import WebApp from '@twa-dev/sdk';
import styled from 'styled-components';
import { faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TaskProps {
  isLocked: boolean;
  description: string;
  url: string;
  points: number;
}

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
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
export function Task({ isLocked, description, url, points }: TaskProps) {
  const lockIconColor = isLocked ? 'gray' : 'green';
  const lockIcon = isLocked ? faLock : faCheck;

  return (
    <Card>
    <TaskContainer>
      <TaskIcon>
        <FontAwesomeIcon icon={lockIcon} color={lockIconColor} />
      </TaskIcon>
      <DescriptionColumn>
        <p>{description}</p>
      </DescriptionColumn>
      <UrlLink href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </UrlLink>
      <BadgeColumn>
        <Badge>{points}</Badge>
      </BadgeColumn>
    </TaskContainer>

    </Card>
  );
}
