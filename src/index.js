import express from "express";
import { fileURLToPath } from "url";
import index from "./routes/+page.js";
import counter from "./routes/counter/+page.js";
import posts from "./routes/posts/+page.js";
import { WATCH_URL } from "./watch.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const routes = {
  "/": index,
  "/posts": posts,
  "/counter": counter,
};

function listen() {
  const port = 8080;
  const app = express();
  app.use("/static", express.static(__dirname + "/islands"));

  Object.entries(routes).forEach(([key, value]) =>
    app.get(key, (req, res) => {
      let rawHTML = value(req);
      const headEndIndex = rawHTML.indexOf("</head>");

      const scriptToInsert = /*html*/ `
        <script>
          const evtSource = new EventSource(${WATCH_URL});

          evtSource.onmessage = (event) => {
            console.log(event)
          }
        </script>
      `;

      const html =
        rawHTML.slice(0, headEndIndex) +
        scriptToInsert +
        rawHTML.slice(headEndIndex);

      res.send(html);
    })
  );

  return app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

let server = listen();
