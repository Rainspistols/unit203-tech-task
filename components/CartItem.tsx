import CartItemType from '@/types/cartItem';
import Image from 'next/image';
import styled from 'styled-components';
import ColorIndicator from './common/ColorIndicator';

const CartItemStyled = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainerStyled = styled.li`
  position: relative;
  width: ${({ theme: { vw } }) => vw.desktop(400)};
  height: ${({ theme: { vw } }) => vw.desktop(200)};
`;

const ItemDetailsContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;
`;

const TitleWithPriceContainerStyled = styled.div`
  ${({ theme: { flex } }) => flex.between};
  width: 100%;
  margin-bottom: ${({ theme: { vw } }) => vw.desktop(20)};
`;

const CartItemNameStyled = styled.span`
  font-size: ${({ theme: { vw } }) => vw.desktop(20)};
  font-weight: 800;
  color: ${({ theme: { color } }) => color.blue};
`;

const PriceStyled = styled.span`
  font-size: ${({ theme: { vw } }) => vw.desktop(14)};
  font-weight: 500;
  color: ${({ theme: { color } }) => color.black};
`;

const DeliveryDateStyled = styled.p`
  font-size: ${({ theme: { vw } }) => vw.desktop(14)};
  font-weight: 400;
  color: ${({ theme: { color } }) => color.black};
  align-self: flex-end;
  margin-bottom: ${({ theme: { vw } }) => vw.desktop(30)};
`;

const RemoveButtonStyled = styled.button`
  text-decoration: underline;
  font-size: ${({ theme: { vw } }) => vw.desktop(14)};
  font-weight: 400;
  color: ${({ theme: { color } }) => color.black};
  align-self: flex-end;
  background-color: transparent;

  :hover,
  :focus {
    opacity: 0.7;
    ${({ theme: { transition } }) => transition.medium};
  }
`;

type Props = {
  cartItem: CartItemType;
  deliveryDate?: string;
  removeLineItem: () => void;
};

const CartItem = ({ cartItem, deliveryDate, removeLineItem }: Props) => {
  return (
    <CartItemStyled>
      <ImageContainerStyled>
        <Image src={cartItem.image} fill alt={cartItem.title} quality={100} />
      </ImageContainerStyled>
      <ItemDetailsContainerStyled>
        <TitleWithPriceContainerStyled>
          <CartItemNameStyled>{`${cartItem.swatchTitle.toUpperCase()} / Without Ottoman / 3`}</CartItemNameStyled>
          <PriceStyled>${cartItem.price}</PriceStyled>
        </TitleWithPriceContainerStyled>
        <ColorIndicator swatchColor={cartItem.swatchColor} swatchTitle={cartItem.swatchTitle} />
        <DeliveryDateStyled>
          {deliveryDate
            ? `Estimated Delivery Date: ${deliveryDate}`
            : 'Provide correct postal code (starts from V, M or K)'}
        </DeliveryDateStyled>
        <RemoveButtonStyled onClick={removeLineItem}>Remove</RemoveButtonStyled>
      </ItemDetailsContainerStyled>
    </CartItemStyled>
  );
};

export default CartItem;
