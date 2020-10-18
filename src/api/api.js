import instanceElo from "./instanceElo";

export default {
  GET(path) {
    return instanceElo.get(path);
  }
};
