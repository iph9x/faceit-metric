import instanceElo from "./instanceElo";
// import instanceAuth from "./instanceAuth";

export default {
  // GET_V4(path) {
  //   return instanceAuth.get(path);
  // },
  GET_ELO(path) {
    return instanceElo.get(path);
  }
};
