const removeFromArray = function<T>(array: T[], ...args: T[]): T[] {
    const newArray: T[] = [];
    array.forEach((item) => {
        if (!args.includes(item)) {
          newArray.push(item);
        }
      });

      return newArray;
};

// Do not edit below this line
export default removeFromArray;
