type Count = {
  word: string;
  count: number;
};

type WordsMap = {
  [key: string]: number;
};

const getIndexOfNextSpace = (content: Buffer) => {
  const chars = content.values();
  let pos = 0;
  for (const char of chars) {
    const isLetter = (char >= 65 && char <= 90) || (char >= 97 && char <= 122);
    if (!isLetter) {
      return pos;
    }
    pos++;
  }
  return -1;
};

const iterateWords = (content: string | Buffer, fn: (word: string) => void) => {
  if (typeof content === "string") {
    content = Buffer.from(content, "utf-8");
  }
  let pos;
  while ((pos = getIndexOfNextSpace(content)) >= 0) {
    if (pos === 0) {
      content = content.slice(1);
      continue;
    }
    const word = content.slice(0, pos).toString();
    fn(word);
    content = content.slice(pos + 1);
  }
  if (content.length) {
    const word = content.toString();
    fn(word);
  }
};

/**
 * Count words in a text or buffer.
 *
 * @param text Text or content buffer to process
 * @returns The count of words in a dictionary-like format
 */
export const countWords = (text: string | Buffer): WordsMap => {
  const wordsMap: WordsMap = {};

  iterateWords(text, (word) => {
    const lowerCaseWord = word.toLowerCase();
    if (!wordsMap[lowerCaseWord]) {
      wordsMap[lowerCaseWord] = 0;
    }
    wordsMap[lowerCaseWord]++;
  });

  return wordsMap;
};

/**
 * Process words count to get top matches.
 *
 * @param wordMap The result from countWords()
 * @param limit The limit of top results to get
 * @returns The top matches
 */
export const getTopWordCount = (wordMap: WordsMap, limit: number): Count[] => {
  const countAsList = Object.keys(wordMap).reduce((acc, word) => {
    acc.push({
      word,
      count: wordMap[word],
    });
    return acc;
  }, []);
  return countAsList.sort((a, b) => b.count - a.count).slice(0, limit);
};
