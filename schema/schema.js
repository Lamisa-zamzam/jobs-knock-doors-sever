const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLList,
} = graphql;

const _ = require("lodash");

const jobSeekers = [
    { id: "1", email: "test@gmail.com", password: "test" },
    { id: "2", email: "test1@gmail.com", password: "test" },
    { id: "3", email: "test2@gmail.com", password: "test" },
];

const employers = [
    { id: "1", email: "test4@gmail.com", password: "test" },
    { id: "2", email: "test5@gmail.com", password: "test" },
    { id: "3", email: "test6@gmail.com", password: "test" },
];

const jobs = [
    { id: "1", title: "Full Stack Developer", employerId: "1" },
    { id: "2", title: "MERN Stack Developer", employerId: "1" },
    { id: "3", title: "MEAN Stack Developer", employerId: "3" },
];

const Experiences = [
    { id: "1", jobSeekerId: "1", title: "Backend Developer" },
    { id: "2", jobSeekerId: "1", title: "Backend Developer" },
    { id: "3", jobSeekerId: "1", title: "Backend Developer" },
];

const JobType = new GraphQLObjectType({
    name: "Job",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        company: { type: GraphQLString },
        location: { type: GraphQLString },
        remote: { type: GraphQLBoolean },
        postTime: { type: GraphQLString },
        jobType: { type: GraphQLString },
        seniorityLevel: { type: GraphQLString },
        aboutCompany: { type: GraphQLString },
        jobDescription: { type: GraphQLString },
        responsibilities: { type: GraphQLString },
        requirements: { type: GraphQLString },
        contactPerson: { type: GraphQLString },
        salary: { type: GraphQLString },
        facilities: { type: GraphQLString },
        employer: {
            type: EmployerType,
            resolve(parent, args) {
                return _.find(employers, { id: parent.employerId });
            },
        },
    }),
});

const JobSeekerType = new GraphQLObjectType({
    name: "JobSeeker",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        title: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone: { type: GraphQLString },
        image: { type: GraphQLString },
        location: { type: GraphQLString },
        summary: { type: GraphQLString },
        experience: { type: GraphQLString },
        skills: { type: GraphQLString },
    }),
});

const ExperienceType = new GraphQLObjectType({
    name: "Experience",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        company: { type: GraphQLString },
        location: { type: GraphQLString },
        jobType: { type: GraphQLString },
        date: { type: GraphQLString },
        jobSeeker: {
            type: JobSeekerType,
            resolve(parent, args) {
                return _.find(jobSeekers, { id: parent.jobSeekerId });
            },
        },
        description: { type: GraphQLString },
    }),
});

const EmployerType = new GraphQLObjectType({
    name: "Employer",
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone: { type: GraphQLString },
        jobs: {
            type: new GraphQLList(JobType),
            resolve(parent, args) {
                return _.filter(jobs, { employerId: parent.id });
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        jobSeeker: {
            type: JobSeekerType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                // get data from DB
                return _.find(jobSeekers, function (o) {
                    return (
                        o.email === args.email && o.password === args.password
                    );
                });
            },
        },
        employer: {
            type: EmployerType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
            },
            resolve(parent, args) {
                // get data from DB
                return _.find(employers, function (o) {
                    return (
                        o.email === args.email && o.password === args.password
                    );
                });
            },
        },
        job: {
            type: JobType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, args) {
                // get data from DB
                return _.find(jobs, function (o) {
                    return o.id === args.id;
                });
            },
        },
        jobs: {
            type: new GraphQLList(JobType),
            resolve(parent, args) {
                return jobs;
            },
        },
        jobSeekers: {
            type: new GraphQLList(JobSeekerType),
            resolve(parent, args) {
                return jobSeekers;
            },
        },
    },
});

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
});
