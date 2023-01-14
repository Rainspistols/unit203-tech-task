import styled from 'styled-components';
import CartItem from '@/components/CartItem';
import CartItemType from '@/types/cartItem';
import { GetServerSideProps } from 'next';

import { useState } from 'react';

const HomeStyled = styled.div`
  color: ${({ theme: { color } }) => color.lightGrey};
  padding: ${({ theme: { vw } }) => `${vw.desktop(50)} ${vw.desktop(200)}`};
`;

const TitleStyled = styled.h1`
  font-size: ${({ theme: { vw } }) => vw.desktop(40)};
  color: ${({ theme: { color } }) => color.blue};
`;

const ItemsListStyled = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme: { vw } }) => vw.desktop(40)};
`;

type Props = {
  initialCartItems: CartItemType[];
};

const Home = ({ initialCartItems }: Props) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);

  const removeLineItem = (lineItemId: number) =>
    setCartItems((prevState) => prevState.filter(({ id }) => id !== lineItemId));

  return (
    <HomeStyled>
      <TitleStyled>Your Cart</TitleStyled>
      <ItemsListStyled>
        {cartItems.map((cartItem) => (
          <CartItem
            cartItem={cartItem}
            key={cartItem.id}
            deliveryDate={cartItem.deliveryDate}
            removeLineItem={() => removeLineItem(cartItem.id)}
          />
        ))}
      </ItemsListStyled>
    </HomeStyled>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { cartItems } = await fetch(`${process.env.websiteURL}/api/cartItems`).then((data) => data.json());

  return { props: { initialCartItems: cartItems } };
};

export default Home;
