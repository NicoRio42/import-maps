/**
 * @typedef {Object} Props
 * @property {number} count
 */

/**
 *
 * @param {Props} props
 * @returns {string}
 */
export function WebCounterTemplate({ count }) {
  return /*html*/ `
        <web-counter>
            <button type="button">Decrement</button>

            <input type="number" value=${count}>

            <button type="button">Increment</button>
        </web-counter>
    `;
}
