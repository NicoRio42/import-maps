import { Base } from "../../layouts/Base.js";

/**
 *
 * @param {import("express").Request} req
 * @returns
 */
export default function Page(req) {
  return /*html*/ `
        ${Base({ title: "Posts", slot: "Posts" })}
    `;
}
