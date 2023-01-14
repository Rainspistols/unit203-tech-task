import CartFees from '@/components/CartFees';
import CartItem from '@/components/CartItem';
import CartItemType from '@/types/cartItem';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const AddNewItemButtonStyled = styled.button`
  font-size: ${({ theme: { vw } }) => vw.desktop(40)};
  font-weight: 700;
  background: ${({ theme: { color } }) => color.blue};
  color: ${({ theme: { color } }) => color.white};
  padding: ${({ theme: { vw } }) => vw.desktop(20)};
  border-radius: ${({ theme: { vw } }) => vw.desktop(12)};
  margin-bottom: ${({ theme: { vw } }) => vw.desktop(40)};
  ${({ theme: { transition } }) => transition.medium};

  :hover,
  :focus {
    opacity: 0.7;
  }
`;

const PostalCodeInput = styled.input`
  height: ${({ theme: { vw } }) => vw.desktop(40)};
  width: ${({ theme: { vw } }) => vw.desktop(100)};
  color: ${({ theme: { color } }) => color.blue};
  border: 1px solid ${({ theme: { color } }) => color.lightGrey};
  font-size: ${({ theme: { vw } }) => vw.desktop(20)};
  font-weight: 700;
  border-radius: ${({ theme: { vw } }) => vw.desktop(12)};
  outline: none;
  padding: ${({ theme: { vw } }) => `0 ${vw.desktop(20)}`};
`;

type Props = {
  initialCartItems: CartItemType[];
};

const Home = ({ initialCartItems }: Props) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(initialCartItems);
  const [postalCode, setPostalCode] = useState('');

  const removeLineItem = (lineItemId: number) =>
    setCartItems((prevState) => prevState.filter(({ id }) => id !== lineItemId));

  const addLineItem = (lineItem: CartItemType) => {
    setCartItems([...cartItems, lineItem]);
  };

  const createUniqueId = (): number => cartItems.slice(-1)[0]?.id + 1 || 0;

  const calcTotalSum = (): number =>
    Number(cartItems.reduce((acc, current) => acc + current.price * current.quantity, 0));

  const calcTaxes = (): number => calcTotalSum() * 0.13;

  useEffect(() => {
    const fetchCartItems = async () => {
      const { cartItems } = await fetch(`${process.env.websiteURL}/api/cartItems?postalCode=${postalCode}`).then(
        (data) => data.json()
      );
      setCartItems(cartItems);
    };

    if (postalCode && ['V', 'M', 'K'].includes(postalCode[0].toUpperCase())) {
      fetchCartItems();
    } else {
      setCartItems((prevState) => prevState.map((item) => ({ ...item, deliveryDate: undefined })));
    }
  }, [postalCode[0]]);

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
      <AddNewItemButtonStyled
        onClick={() => {
          addLineItem({
            id: createUniqueId(),
            title: 'Grey Sofa',
            price: 499.99,
            quantity: 1,
            image:
              'https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75',
            swatchColor: '#959392',
            swatchTitle: 'Grey',
          });
        }}
      >
        Add random item to the cart
      </AddNewItemButtonStyled>
      <CartFees subtotal={calcTotalSum()} taxes={calcTaxes()} shipping={15} />
      <PostalCodeInput type='text' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
    </HomeStyled>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { cartItems } = await fetch(`${process.env.websiteURL}/api/cartItems`).then((data) => data.json());

  return { props: { initialCartItems: cartItems } };
};

export default Home;
