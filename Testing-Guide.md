# Test Instruction

Install libraries

```
npm install
```

Install drivers for e2e

```
npx playwright install
```

## Run unit test

```
npm run test:unit

```

Run single file

```
npx mocha --grep "QuizItem"
```

## Run integration test

```
npm run test:integration
```

## Run e2e test

```
npm run test:e2e
```

Run single test file

```
npx cross-env NODE_ENV=test npx playwright test "./test/e2e/create-quizitem.test.js"

```

Generate report

```
npx cross-env NODE_ENV=test npx playwright test --reporter=html

```
