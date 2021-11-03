const firebaseTimestampConverter = (time: {
  seconds: number;
  nanoseconds: number;
}) => {
  if (time?.seconds) return new Date(time.seconds * 1000).toUTCString();
  return "";
};
export {firebaseTimestampConverter};
