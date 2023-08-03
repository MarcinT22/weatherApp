export const colors = {
  sunny: {
    primary: "#0c5fc4",
    secondary: "#8bbffc",
  },
  rainy: {
    primary: "#4c9e83",
    secondary: "#8ed4bd",
  },
  snowy: {
    primary: "#6d8bad",
    secondary: "#b5d3f7",
  },
};

export const getColors = (id: number | undefined) => {
  if (!id) {
    return colors.sunny;
  }

  switch (true) {
    case id >= 800:
      return colors.sunny;
    case id >= 700:
      return colors.rainy;
    case id >= 600:
      return colors.snowy;
    case id >= 200:
      return colors.rainy;
  }
};
