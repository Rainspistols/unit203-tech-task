import styled from 'styled-components';

const ColorIndicatorStyled = styled.div`
  ${({ theme: { flex } }) => flex.center};
  display: inline-flex;
  gap: ${({ theme: { vw } }) => vw.desktop(10)};
  margin-bottom: ${({ theme: { vw } }) => vw.desktop(20)};
`;

type ColorCircleStyledProps = {
  color: string;
};

const ColorCircleStyled = styled.span<ColorCircleStyledProps>`
  background-color: ${({ color }) => color};
  width: ${({ theme: { vw } }) => vw.desktop(30)};
  height: ${({ theme: { vw } }) => vw.desktop(30)};
  border-radius: ${({ theme: { vw } }) => vw.desktop(50)};
`;

const ColorNameStyled = styled.span``;

type Props = {
  swatchColor: string;
  swatchTitle: string;
};

const ColorIndicator = ({ swatchColor, swatchTitle }: Props) => {
  return (
    <ColorIndicatorStyled>
      <ColorCircleStyled color={swatchColor} />
      <ColorNameStyled>{swatchTitle}</ColorNameStyled>
    </ColorIndicatorStyled>
  );
};

export default ColorIndicator;
