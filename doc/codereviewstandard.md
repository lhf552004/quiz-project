## Code Review Standard

### Code style guidelines: 

Establish clear guidelines for code style, includes

Naming conventions: We make sure that our filename and methods/functions names clearly convey their purposes. This will help with eliminate unnecessary comments for other devs in the team. For example: `quizRouter` is router specifically for quiz. `quiz.pug` is a view specifically for quiz. 

Code formatting: We need to review each other codes and agree with the same styling to make sure everyone follow the same structure. This would make it easier to understand and follow other developers' code even when we don't personally write them.

Comments: All codes should have adequate comments to explain the logic and reasons behind what we are doing. This does not mean excessive comments when it's not needed for straightforward or simple codes to prevent clustering. 

### Code quality guidelines: 

It's important to make sure written code keep up with the team standard. Each team member has a different level of coding, however, it's our responsibility to improve and keep up with the standard. Other team members are also willing to help when reviewing PRs or being asked. 

We need to make sure what we write is following decoupling methodology. We unsure what we write can be reused somewhere else in the project as much as possible. This will help with maintainability and scalability. 

By that, when there are changes need to be made, we can change in one place instead of multiple places. In the other hand, it should not restrict the scalability of modules that extend the base code. The base component need to be simple or flexible enough for other module to extend.

Written codes need to be easy to follow, and explain in details as needed. 

### Review process guidelines: 

Establish clear guidelines for the code review process, including the roles and responsibilities of reviewers, the types of feedback that are appropriate, and the timeline for review. Make sure that reviews are conducted in a timely manner and that feedback is constructive and actionable.

Each changes from a team member needs to be made into a separate branch from dev. Before pushing up for reviews, the dev needs to make sure their changes have passed regression tests (tests are not required for assignment 2).

The developers then move their task card to review columns, and tag the reviewer to review the PR. After a PR is approved, the reviewer or the developer can merge it into the main branch. 

The reviewer's responsibility is making sure that the PR is working correctly and do not affect existing functionalities. If there are issues, the reviewer needs to comment and gives the original developer know the issue, and may provide assistance. The reviewer also uses the code review checklist to make sure everything is covered. Code Review Checklist may change as necessary to adapt the project's growth.

Both reviewers and responsible developers need to response in timely manner. If they can get back in allowed time, they should deligate the reviewing response to someone else who can also do the reviewing process. 

### Documentation guidelines: 

After adding in any new functionality, a documentation needs to be made or instruct other team of developers know how to use such functionality. In case usage is not clear, a documentation is required. 

When a UI design is created for our team, each front-end dev gets a task ticket for their responsible view and a link to the design with details of what needs to be done. 

When a API endpoint is created, a documentation needs to be updated/made to explain how it should be called. 

### Security guidelines (Not appliable): 

Establish standards for security, including best practices for handling sensitive data, protecting against common security vulnerabilities, and complying with relevant security standards and regulations. 

**The team will consider in future sprints to implement this if we have time.** 

### Communication guidelines: 

The team needs to have clear communications and timely manner responses. 

When a team member has a question/doubt about the product requirements, they need to bring up to the client/the scrum master (the professor) as soon as possible. If any tasks or document is not clear, the team member needs to bring it up directly to the requester or the documentation's author to improve and clarify. 

For code review communication, please review process guideline. 

For communication during development, when teams need support from each other (front-end and back-end), the requirements need to be listed out clearly with usage purposes. For example: front-end dev asks for a custom API call, they need to explain why they need it and how they would use it. 

When designers hand off design to developers, they need to express clearly how the screen needs to be built. And the developers have a chance to express all difficulty that they might have and discuss on changing it as necessary. 

