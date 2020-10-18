import instance from "./instance";

export default {
  GET(path) {
    return instance.get(path);
  }
};
