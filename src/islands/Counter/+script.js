class WebCounter extends HTMLElement {
  constructor() {
    console.log("web counter defined");
    super();
    this.input = document.createElement("input");
  }

  connectedCallback() {
    const btns = this.querySelectorAll("button");
    const decrementBtn = btns[0];
    const incrementBtn = btns[1];
    const input = this.querySelector("input");

    console.log(this.textContent, btns);
    if (input === null) throw new Error("");
    this.input = input;

    decrementBtn.onclick = () => this.setInputValue(+input.value - 1);
    incrementBtn.onclick = () => this.setInputValue(+input.value + 1);
  }

  /**
   * @param {number} value
   */
  setInputValue(value) {
    this.input.value = String(value);
    this.input.setAttribute("value", String(value));
  }
}

customElements.define("web-counter", WebCounter);
