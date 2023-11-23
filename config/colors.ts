export const colors = {
  cloudy: {
    primary: "#3286B5",
    secondary: "#A8E2FB",
  },
  snowy: {
    primary: "#838D98",
    secondary: "#DAE4F0",
  },
  sunny: {
    primary: "#0c5fc4",
    secondary: "#8bbffc",
  },
  rainy: {
    primary: "#4c9e83",
    secondary: "#8ed4bd",
  },
};

export const getColors = (id: number | undefined) => {
  if (!id) {
    return colors.sunny;
  }

  switch (true) {
    case id >= 802:
      return colors.cloudy;
    case id >= 800:
      return colors.sunny;
    case id >= 700:
      return colors.rainy;
    case id >= 600:
      return colors.snowy;
    case id >= 200:
      return colors.rainy;
    default:
      return colors.sunny;
  }
};
