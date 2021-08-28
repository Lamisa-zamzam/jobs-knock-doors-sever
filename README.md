# Jobs Knock Doors Server

## [Live Site]()

Welcome to my GraphQL server!!! Here you can request a number of data which is basically the data for a Job Portal Website from this server. There is a super charged endpoint, /graphql, and it has the following fields in its root query and mutations:

### Root Query

-   JobSeeker : returns the job seeker with the email and password provided in the args
-   JobSeekerById : returns the job seeker with the id provided in the args
-   employer: returns the employer with the email and password provided in the args
-   job : returns the job with the id provided in the args
-   jobs: returns all jobs
-   jobSearch: returns the job with the title and location provided in the args
-   employeeSearch: returns the employee with the name and title provided in the args
-   jobSeekers: returns all jobSeekers

### Mutations

-   addJob: saves the job info provided in the args in DB
-   addJobSeeker: saves the job seeker info provided in the args in DB
-   addEmployer: saves the employer info provided in the args in DB
-   updateJobSeeker: updates the job seeker info as provided in the args in DB

My project includes:

1.  [Node.js](https://nodejs.org/en/),
2.  [Mongodb](https://www.mongodb.com/),
3.  [Express.js](https://expressjs.com/),
4.  Mongoose,
5.  GraphQL,
6.  Express Graphql
7.  Nodemon
8.  [Cross Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) ,
9.  [Environment Variables](https://www.npmjs.com/package/dotenv) and
10. AWS Deployment.
