import { beginCell, toNano, Address, Cell, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { useFaucetJettonContract } from "../hooks/useFaucetJettonContract";
import { useState } from "react";
import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Button,
  Ellipsis,
} from "./styled/styled";
import axios from 'axios';
export function Jetton() {
  const { connected } = useTonConnect();
  const { mint, jettonWalletAddress, balance } = useFaucetJettonContract();

  const [initData, setInitData] = useState<any>();
  const [username, setUsername] = useState<string | null>();

  const urlParams = new URLSearchParams(window.location.search);
  setUsername(urlParams.get('username'));

  axios.get(`http://localhost:5120/App/1/${username}`)
    .then(function (response) {
      // handle success
      setInitData(response.data)      
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  return (
    <Card title="Jetton">
      <FlexBoxCol>
        <h1>username: {username}</h1>
        <h1>data: {initData}</h1>
        <h3>Faucet Jetton</h3>
        <FlexBoxRow>
          Wallet
          <Ellipsis>{jettonWalletAddress}</Ellipsis>
        </FlexBoxRow>
        <FlexBoxRow>
          Balance
          <div>{balance ?? "Loading..."}</div>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          onClick={async () => {
            mint();
          }}
        >
          Get jettons from faucet
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
