import instanceAuth from "./instanceAuth";
import instanceElo from "./instanceElo";

export default {
  GET_OPEN(path) {
    return instanceAuth.get(path);
  },
  GET_ELO(path) {
    return instanceElo.get(path);
  }
};
