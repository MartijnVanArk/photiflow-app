export const simpleTypeGetter = (payload: any): any => {
  const types: { [key: string]: any } = {};

  for (const key in payload) {
    const to = typeof payload[key];

    if (to === "object") {
      if (Array.isArray(payload[key])) {
        if (typeof payload[key][0] === "object") {
          const arrObjTypes = simpleTypeGetter(payload[key][0]);
          types[key] = JSON.stringify(arrObjTypes) + "[]";
        } else {
          types[key] = `${typeof payload[key][0]}[]`;
        }
      } else {
        const objTypes = simpleTypeGetter(payload[key]);
        types[key] = objTypes;
      }
    } else {
      types[key] = to;
    }
  }

  return types;
};
