import { useTonConnectModal } from "@tonconnect/ui-react";
import WebApp from '@twa-dev/sdk';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { postUserAction } from "../apis/api";
import { useTonConnect } from "../hooks/useTonConnect";
import { BadgeColumn, Card, DescriptionColumn, TaskContainer, TaskIcon } from "./styled/styled";

enum ActionType {
  None = 0,
  ConnectBlockchainWallet = 1,
  FollowOnSocialMedia = 2,
  ShareSocialMediaPost = 3,
  ReadContentCompletely = 4,
  InviteFriends = 5
}
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3); // Semi-transparent black
  z-index: 2; // Make sure this is above the content
`;
export interface TaskProps {
  id: number;
  isLocked: boolean;
  title: string;
  description: string;
  point: number;
  type: ActionType;
  redirectionLink: string | null,
  icon: string,
  publishedAt: Date,
  openModal: Function,
  setSelectedTaskId: Function,
  setLoading: Function
}



export function Task({ isLocked, title, description, point, id, type, redirectionLink, openModal, setSelectedTaskId, setLoading, icon }: TaskProps) {
  const { open } = useTonConnectModal();
  const navigate = useNavigate();
  const { connected, wallet } = useTonConnect();
  useEffect(() => {
    // Define an async function inside the useEffect
    const handleAction = async () => {
      try {
        setLoading(true);
        if (type === ActionType.ConnectBlockchainWallet) {
          const sessionWallet = sessionStorage.getItem("tg-wallet");
          if (connected && wallet && !sessionWallet) {
            await postUserAction(id, { data: wallet });
            sessionStorage.setItem("tg-wallet", wallet);
            window.location.reload(); // This will reload the page and interrupt the flow, consider handling this differently if needed
          }
          // else if (!connected && sessionWallet) {
          //   console.log("removing");
          //   sessionStorage.removeItem("wallet");
          // }
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the async function
    handleAction();
  }, [connected, wallet, type, id]);

  const doTheAction = async () => {
    try {
      setLoading(true);
      setSelectedTaskId(id);
      if (type === ActionType.FollowOnSocialMedia) {
        await postUserAction(id, { data: "" });
        if (redirectionLink) {
          WebApp.openLink(redirectionLink, { try_instant_view: true });
          window.location.reload();
        }
      } else if (type === ActionType.ReadContentCompletely) {
        navigate(`/story/${id}`);
      } else if (type === ActionType.InviteFriends) {
        navigate(`/referrals`);
      } else if (type === ActionType.ShareSocialMediaPost) {
        if (redirectionLink) {
          openModal();
          WebApp.openLink(redirectionLink, { try_instant_view: true });
        }
      } else if (type === ActionType.ConnectBlockchainWallet && connected == false) {

        open();

      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <TaskContainer onClick={() => {
        doTheAction();
      }}>
        {!isLocked && <Overlay />}

        <TaskIcon>
          <img width={20} src={icon} alt="" />
        </TaskIcon>

        <DescriptionColumn>
          <span style={{ fontSize: "12px", color: isLocked ? "#FFF" : "#FFFFFF4D" }}>{title}</span>
          {/* <span style={{ display: isLocked ? "none" : "block", fontSize: "12px", color: isLocked ? "#FFF" : "#FFFFFF4D" }}>{isLocked ? description : "Completed"}</span> */}
          {/* {type === ActionType.ConnectBlockchainWallet && (<TonConnectButton style={{ marginTop: "16px", fontSize: "small" }} />)} */}
        </DescriptionColumn>

        <BadgeColumn>
          {
            isLocked ? (
              <>
                <b style={{ color: "#02B1AA", fontSize: "14px", marginRight: "5px" }}>{point}</b> <img width={14} src="./gem.svg" alt="" />
              </>
            ) : (
              <img width={14} src="./tick.svg" alt="" />
            )
          }
        </BadgeColumn>

      </TaskContainer>
    </Card>
  );
}
