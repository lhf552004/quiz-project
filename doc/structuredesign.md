## Quiz system structure Design

The system adopts express.js framework and pug as the view engine.

The data is stored at firebase. [Explanation on Firebase DB](../doc/Quizbank%20%26%20DB%20explanation.pdf)

The logic of quiz bank is seperated into quizbank.mjs module.

The routers are divided into related router.

The views are pure ui page

!["Structure Diagram"](/doc/images/structure-diagram.png)