export const isEmpty = (obj: Record<string, any>): boolean => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};
