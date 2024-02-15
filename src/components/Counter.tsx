import { TonConnectButton } from "@tonconnect/ui-react";
import { useCounterContract } from "../hooks/useCounterContract";
import { useTonConnect } from "../hooks/useTonConnect";

import {
  Card,
  FlexBoxCol,
  FlexBoxRow,
  Ellipsis,
  Button,
} from "./styled/styled";
import WebApp from '@twa-dev/sdk';

export function Counter() {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();

  const sendData = () => {
    WebApp.sendData(JSON.stringify({
      dataType: 0,
      postLink: "https://google.com"
    }));
  }

  const sendInstaData = () => {
    WebApp.sendData(JSON.stringify({
      dataType: 1,
      postLink: "https://google.com",
      test: "asdasdasd"
    }));
  }
  return (
    <div className="Container">
      <TonConnectButton />

      <Card>
        <FlexBoxCol>
          <p>
            {WebApp.initData}
          </p>
          <h3>Counter</h3>
          <FlexBoxRow>
            <b>Address</b>
            <Ellipsis>{address}</Ellipsis>
          </FlexBoxRow>
          <FlexBoxRow>
            <b>Value</b>
            <div>{value ?? "Loading..."}</div>
          </FlexBoxRow>
          <Button
            disabled={!connected}
            className={`Button ${connected ? "Active" : "Disabled"}`}
            onClick={() => {
              sendIncrement();
            }}
          >
            Increment
          </Button>
          <Button
            onClick={() => {
              sendData();
            }}
          >
            SendData
          </Button>

          <Button
            onClick={() => {
              sendInstaData();
            }}
          >
            Send insta Data
          </Button>
        </FlexBoxCol>
      </Card>
    </div>
  );
}
