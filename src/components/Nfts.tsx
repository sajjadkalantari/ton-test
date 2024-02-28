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
  width: calc(50% - 20px);
  margin: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #404043;
`;

// Styled component for images
const NftImage = styled.img`
  width: 100%;
  height: auto;
`;

// Styled component for item names
const NftName = styled.p`
  text-align: center;
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