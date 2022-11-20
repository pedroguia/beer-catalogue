const getRoute = {
  LIST: () => "/beers",
  DETAIL: (id: string) => `/beers/${id}`,
};

export default getRoute;
