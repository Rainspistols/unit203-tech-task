import styled from 'styled-components';

const CartFeesStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme: { vw } }) => vw.desktop(10)};
  margin-bottom: ${({ theme: { vw } }) => vw.desktop(20)}; ;
`;

const FeeItemStyled = styled.div`
  ${({ theme: { flex } }) => flex.between};
  color: ${({ theme: { color } }) => color.black};
  font-size: ${({ theme: { vw } }) => vw.desktop(16)};
  font-weight: 400;

  :last-of-type {
    color: ${({ theme: { color } }) => color.blue};
    font-weight: 700;
  }
`;

const NameStyled = styled.span`
  font-size: inherit;
  font-weight: inherit;
`;

const ValueStyled = styled.span`
  font-size: inherit;
  font-weight: inherit;
`;

type Props = {
  subtotal: number;
  taxes: number;
  shipping: number;
};

const CartFees = ({ subtotal, taxes, shipping }: Props) => {
  const feesData: { name: string; value: string }[] = [
    {
      name: 'Subtotal',
      value: `$${subtotal.toFixed(2)}`,
    },
    {
      name: 'Taxes (estimated)',
      value: `$${taxes.toFixed(2)}`,
    },
    {
      name: 'Shipping',
      value: shipping > 0 ? `$${shipping}` : 'Free',
    },
    {
      name: 'Total',
      value: `$${(subtotal + taxes + shipping).toFixed(2)}`,
    },
  ];

  return (
    <CartFeesStyled>
      {feesData.map((item) => (
        <FeeItemStyled key={item.name}>
          <NameStyled>{item.name}</NameStyled>
          <ValueStyled>{item.value}</ValueStyled>
        </FeeItemStyled>
      ))}
    </CartFeesStyled>
  );
};

export default CartFees;
