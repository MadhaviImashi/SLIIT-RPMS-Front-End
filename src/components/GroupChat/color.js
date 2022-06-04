export const color = (letter) => {
  const colors = {
    A: "#a180f2",
    B: "#94ec7e",
    C: "#15003e",
    D: "#705ecb",
    E: "#3c4904",
    F: "#a590f9",
    G: "#2eaee1",
    H: "#6ea939",
    I: "#e88242",
    J: "#80f25e",
    K: "#223a98",
    L: "#a445ac",
    M: "#1a72ff",
    N: "#2c3687",
    O: "#8625ae",
    P: "#bf5b71",
    Q: "#d19163",
    R: "#de684",
    S: "#7e6d60",
    T: "#680c70",
    U: "#cf47a7",
    V: "#e225b2",
    W: "#16b6a1",
    X: "#b41990",
    Y: "#65cbd9",
    Z: "#656e77",
  };

  return colors[letter.toUpperCase()];
};
