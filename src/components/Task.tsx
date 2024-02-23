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
import { FetcherSubmitFunction, useNavigate } from 'react-router-dom';
import { postUserAction } from "../api";

enum ActionType {
  None = 0,
  ConnectBlockchainWallet = 1,
  FollowOnSocialMedia = 2,
  ShareSocialMediaPost = 3,
  ReadContentCompletely = 4
}

export interface TaskProps {
  id: number;
  isLocked: boolean;
  title: string;
  description: string;
  point: number;
  type: ActionType;
  redirectionLink: string | null,
  openModal: Function,
  setSelectedTaskId: Function,
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

export function Task({ isLocked, title, description, point, id, type, redirectionLink, openModal, setSelectedTaskId }: TaskProps) {
  const navigate = useNavigate();
  const lockIconColor = isLocked ? 'gray' : 'green';
  const lockIcon = isLocked ? faLock : faCheck;

  const doTheAction = async () => {
    setSelectedTaskId(id);
    if (type === ActionType.FollowOnSocialMedia) {

      await postUserAction(id, { data: "" });

      if (redirectionLink) {
        WebApp.openLink(redirectionLink, { try_instant_view: true });
        window.location.reload();
      }

    } else if (type === ActionType.ReadContentCompletely) {
      navigate(`/story/${id}`);
    } else if (type === ActionType.ShareSocialMediaPost) {
      if (redirectionLink) {
        openModal();
        WebApp.openLink(redirectionLink, { try_instant_view: true });
      }
    }
  }

  return (
    <Card>
      <TaskContainer onClick={() => {
        doTheAction();
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
