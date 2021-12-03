# Count words challenge
## Run app
```
npm i
npm start
```
## Run tests
```
npm i
npm run test
```
## Call endpoint
### From plain text
```
curl --location --request POST 'http://localhost:3000/count-words?top=3' -w "\n" \
--header 'Content-Type: text/plain' \
--data-raw 'Hello everyone hello'
```
### From file
```
curl --location --request POST 'http://localhost:3000/count-words?top=3' -w "\n" \
--header 'Content-Type: text/plain' \
--data @./data/test-files/short-text.txt
```
## Possible Improvements
- The code contains buffer manipulation to support for large files (tested with 1gb file and takes about a minute). But if there is not need for such bug files I would rather use strings and `text.split(/\s+/)`, which makes the code much cleaner
- I would probably move the very small logic I put in the route somewhere else
- I would move code in charge for buffer processing to a separate file
- I would create router files
- I would create a npm script for watchman or ts -w
- I would try to find a better folder for test files
- I would add tests for app.ts
- I would add validation in request parameters, possibly with a library
- I would improve check for letters, to not split words when they have certain characters like underscore