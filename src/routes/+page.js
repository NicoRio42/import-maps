import { Base } from "../layouts/Base.js";

/**
 *
 * @param {import("express").Request} req
 * @returns
 */
export default function Page(req) {
  return Base({
    title: "Hello!",
    slot: /*html*/ `
        Hello !

        <a href="posts">Posts</a>
        <a href="counter">counter</a>
    `,
  });
}
