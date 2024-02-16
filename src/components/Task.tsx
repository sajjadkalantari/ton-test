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

export interface TaskProps {
  id: number;
  isLocked: boolean;
  title: string;
  description: string;
  point: number;
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

const TextColumn = styled.div`
  flex: 4;
  padding: 0 10px;
  text-align: center;
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
  margin-top: 10px; /* Adjust as needed */
`;

export function Task({ isLocked, title, description, point, id }: TaskProps) {
  const lockIconColor = isLocked ? 'gray' : 'green';
  const lockIcon = isLocked ? faLock : faCheck;

  return (
    <Card>
      <TaskContainer onClick={async () => {
            WebApp.sendData({
              actionId: id
            });
            
            window.open("https://twitter.com/", '_blank');
          }}>
        <TaskIcon>
          <FontAwesomeIcon icon={lockIcon} color={lockIconColor} />
        </TaskIcon>
        <TextColumn>
          <p style={{ fontWeight: 'bold', fontSize: 'larger' }}>{title}</p>
          <p>{description}</p>
        </TextColumn>
        <BadgeColumn>
          <Badge>{point}</Badge>
        </BadgeColumn>
      </TaskContainer>
    </Card>
  );
}
