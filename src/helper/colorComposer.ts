const textColorComposer = ({
  color,
  opacity,
}: {
  color: string;
  opacity: string;
}) => {
  return `text-${color}-${opacity}`;
};

const backgroundColorComposer = ({
  color,
  opacity,
}: {
  color: string;
  opacity: string;
}) => {
  return `bg-${color}-${opacity}`;
};

export {textColorComposer, backgroundColorComposer};
