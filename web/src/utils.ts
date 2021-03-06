export const isEmail = (value: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
};

export const webLogger = (value: string, apiColour: string = "white") => {
  console.log(
    `%c[${new Date().toISOString()}] ${value}`,
    "color: yellow",
    `color: ${apiColour}`,
    "color: white"
  );
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
