import { Badge, BadgeColumn, Card, TaskContainer, TaskIcon, TextColumn } from "./styled/styled";
import WebApp from '@twa-dev/sdk';
import { faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { postUserAction } from "../apis/api";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { useTonConnect } from "../hooks/useTonConnect";

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



export function Task({ isLocked, title, description, point, id, type, redirectionLink, openModal, setSelectedTaskId }: TaskProps) {
  const navigate = useNavigate();
  const lockIconColor = isLocked ? 'gray' : 'green';
  const lockIcon = isLocked ? faLock : faCheck;
  const { connected, wallet } = useTonConnect();
  let sentWalletAction = false;
  useEffect(() => {
    if (type === ActionType.ConnectBlockchainWallet && connected && !sentWalletAction) {
      postUserAction(id, { data: wallet });
      sentWalletAction = true;      
    }
  }, [connected, wallet]);

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
    } else if (type === ActionType.ConnectBlockchainWallet) {
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

          {type === ActionType.ConnectBlockchainWallet && (<TonConnectButton style={{ margin: "16px" }} />)}

        </TextColumn>

        <BadgeColumn>
          <Badge>{point}</Badge>
        </BadgeColumn>
      </TaskContainer>
    </Card>
  );
}
