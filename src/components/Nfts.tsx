import styled from 'styled-components';

// Styled component for the items container
const NftsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

// Styled component for individual items
const NftItem = styled.div`
  position: relative;
  width: calc(50% - 20px);
  margin: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(2, 2, 2, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
 // border: 1px solid #404043;
`;

// Styled component for images
const NftImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(2, 2, 2, 0.6) 0%, rgba(0, 0, 0, 0) 100%);
  opacity: 0.7;
`;

// Styled component for item names
const NftName = styled.p`
  position: absolute;
  bottom: 0px;
  left: 10px;
  opacity: 1;
  //text-align: center;
`;


export interface NftItem {
  description: string;
  name: string;
  image: string;
  imageUrl: string;
  attributes: NftAttribute[];
}

export interface NftAttribute {
  trait_type: string;
  value: string;
}


export function NftsDisplay({ items }: { items: NftItem[] }) {
  return (
    <NftsContainer>
      {items.map((item, index) => (
        <NftItem key={index}>
          <NftImage src={item.imageUrl} alt={item.name} />
          <NftName>{item.name}</NftName>
        </NftItem>
      ))}
    </NftsContainer>
  );
}