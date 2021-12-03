import express from "express";
import { countWords, getTopWordCount } from "./count";

const app = express();

const PORT = process.env.PORT || 3000;
const DEFAULT_LIMIT = 3;

app.use(express.raw({ type: "text/plain", limit: "3gb" }));

app.post("/count-words", (req, res) => {
  const text = req.body;

  let limit = Number(req.query.top);
  if (!limit) {
    limit = DEFAULT_LIMIT;
  }

  const count = countWords(text);
  const frequencies = getTopWordCount(count, limit);

  res.send({
    frequencies,
  });
});

app.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}`);
});
