const pixelToVwMobile = (px: number) => `${(px / 768) * 100}vw`;
const pixelToVwDesktop = (px: number) => `${(px / 1920) * 100}vw`;

export { pixelToVwMobile, pixelToVwDesktop };
