const addZeroToNumber = (number) => {
  if (number > 9) {
    return number.toString();
  } else {
    return `0` + number;
  }
};

const convertSecondsToMinutes = (seconds) => {
  let convertedMinutes = Math.floor(seconds / 60);
  let convertedSeconds = Math.floor(seconds % 60);

  return {
    minutes: addZeroToNumber(convertedMinutes),
    seconds: addZeroToNumber(convertedSeconds)
  };
};

export default convertSecondsToMinutes;