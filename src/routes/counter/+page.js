import { WebCounterTemplate } from "../../islands/Counter/+template.js";
import { Base } from "../../layouts/Base.js";

/**
 *
 * @param {import("express").Request} req
 * @returns
 */
export default function Page(req) {
  return /*html*/ `
        ${Base({
          title: "Posts",
          slot: /*html*/ `
            Counter web component

            ${WebCounterTemplate({ count: 2 })}
        `,
          head: /*html*/ `<script src="static/Counter/+script.js"></script>`,
        })}
    `;
}
