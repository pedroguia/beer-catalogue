const filterUnique = (array: any[], key: string): any[] =>
  array.filter((v, i, a) => a.findIndex(t => t[key] === v[key]) === i);

export default filterUnique;
