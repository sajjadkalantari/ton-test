import { Badge, BadgeColumn, Card, TaskContainer, TaskIcon, TextColumn } from "./styled/styled";
import WebApp from '@twa-dev/sdk';
import { faLock, faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
  const lockIconColor = isLocked ? '#DDD' : 'lightgreen';
  const lockIcon = isLocked ? faLock : faCheck;
  const { connected, wallet } = useTonConnect();
  useEffect(() => {
    // Define an async function inside the useEffect
    const handleAction = async () => {
      if (type === ActionType.ConnectBlockchainWallet) {
        const sessionWallet = sessionStorage.getItem("wallet");
        if (connected && wallet && !sessionWallet) {
          await postUserAction(id, { data: wallet });
          sessionStorage.setItem("wallet", wallet);
          window.location.reload(); // This will reload the page and interrupt the flow, consider handling this differently if needed
        } else if (!connected) {
          sessionStorage.removeItem("wallet");
        }
      }
    };

    // Call the async function
    handleAction();
  }, [connected, wallet, type, id]);

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
          <FontAwesomeIcon icon={lockIcon} color={lockIconColor} style={{ padding: "8px", backgroundColor: "#404043", borderRadius: "5px" }} />
        </TaskIcon>
        <TextColumn>
          <span style={{ fontWeight: 'bold', fontSize: 'small', padding: "5px 5px 2px 5px" }}>{title}</span>
          <span style={{ color: "#DDD", fontSize: 'small', padding: "2px 5px 5px 5px" }}>{description}</span>
          {type === ActionType.ConnectBlockchainWallet && (<TonConnectButton style={{ margin: "16px", fontSize: "small" }} />)}
        </TextColumn>

        <BadgeColumn>
          <Badge style={{ fontFamily: '"Press Start 2P"', fontSize: "x-small" }} >{point}</Badge>
          <FontAwesomeIcon icon={faChevronRight} color="#DDD" style={{ marginLeft: "10px", fontSize: "xx-small" }} />
        </BadgeColumn>
      </TaskContainer>
    </Card>
  );
}
