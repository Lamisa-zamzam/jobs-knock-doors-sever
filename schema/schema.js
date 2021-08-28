// GraphQL
const graphql = require("graphql");
// GraphQL Types
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
} = graphql;

// Mongoose Models
const Job = require("../models/Job");
const JobSeeker = require("../models/JobSeeker");
const Employer = require("../models/Employer");
const Experience = require("../models/Experience");

// Graphql Types
// Type for a job
const JobType = new GraphQLObjectType({
    name: "Job",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        company: { type: GraphQLString },
        location: { type: GraphQLString },
        remote: { type: GraphQLBoolean },
        jobType: { type: GraphQLString },
        experience: { type: GraphQLString },
        seniorityLevel: { type: GraphQLString },
        aboutCompany: { type: GraphQLString },
        jobDescription: { type: GraphQLString },
        responsibilities: { type: GraphQLString },
        requirements: { type: GraphQLString },
        salary: { type: GraphQLString },
        facilities: { type: GraphQLString },
        employer: {
            type: EmployerType,
            resolve(parent, args) {
                return Employer.findById(parent.employerId);
            },
        },
    }),
});

// Type for a job seeker
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
        experience: {
            type: new GraphQLList(ExperienceType),
            resolve(parent, args) {
                return Experience.find({ jobSeekerId: parent.id });
            },
        },
        skills: { type: GraphQLList(GraphQLString) },
    }),
});

// Type of an experience in the job seekers profile
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
                return JobSeeker.findOne({ jobSeekerId: parent.jobSeekerId });
            },
        },
        description: { type: GraphQLString },
    }),
});

// Type for an employer
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
                return Jobs.find({ employerId: parent.id });
            },
        },
    }),
});

// Root Query of GraphQL
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
                return JobSeeker.findOne({
                    email: args.email,
                    password: args.password,
                });
            },
        },
        jobSeekerById: {
            type: JobSeekerType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, args) {
                // get data from DB
                return JobSeeker.findOne({
                    _id: args.id,
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
                return Employer.findOne({
                    email: args.email,
                    password: args.password,
                });
            },
        },
        job: {
            type: JobType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                // get data from DB
                return Job.findById(args.id);
            },
        },
        jobs: {
            type: new GraphQLList(JobType),
            resolve(parent, args) {
                // get data from DB
                return Job.find({});
            },
        },
        jobSearch: {
            type: new GraphQLList(JobType),
            args: {
                jobTitle: { type: GraphQLString },
                location: { type: GraphQLString },
            },
            resolve(parent, args) {
                // get data from DB
                return Job.find({
                    title: new RegExp(args.jobTitle, "i"),
                    location: new RegExp(args.location, "i"),
                });
            },
        },
        employeeSearch: {
            type: new GraphQLList(JobSeekerType),
            args: {
                employeeName: { type: GraphQLString },
                employeeTitle: { type: GraphQLString },
            },
            resolve(parent, args) {
                // get data from DB
                return JobSeeker.find({
                    name: new RegExp(args.employeeName, "i"),
                    title: new RegExp(args.employeeTitle, "i"),
                });
            },
        },
        jobSeekers: {
            type: new GraphQLList(JobSeekerType),
            resolve(parent, args) {
                // get data from DB
                return JobSeeker.find({});
            },
        },
    },
});

// GraphQL Mutations
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addJob: {
            type: JobType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                company: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) },
                remote: { type: new GraphQLNonNull(GraphQLString) },
                jobType: { type: new GraphQLNonNull(GraphQLString) },
                experience: { type: new GraphQLNonNull(GraphQLString) },
                seniorityLevel: { type: new GraphQLNonNull(GraphQLString) },
                aboutCompany: { type: new GraphQLNonNull(GraphQLString) },
                jobDescription: { type: new GraphQLNonNull(GraphQLString) },
                responsibilities: { type: GraphQLString },
                requirements: { type: GraphQLString },
                salary: { type: new GraphQLNonNull(GraphQLString) },
                facilities: { type: GraphQLString },
                employerId: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // Job
                let job = new Job({
                    title: args.title,
                    company: args.company,
                    location: args.location,
                    remote: args.remote,
                    jobType: args.jobType,
                    experience: args.experience,
                    seniorityLevel: args.seniorityLevel,
                    aboutCompany: args.aboutCompany,
                    jobDescription: args.jobDescription,
                    responsibilities: args.responsibilities,
                    requirements: args.requirements,
                    salary: args.salary,
                    facilities: args.facilities,
                    employerId: args.employerId,
                });

                // Save new job in DB
                return job.save();
            },
        },
        addJobSeeker: {
            type: JobSeekerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLString },
            },
            resolve(parent, args) {
                // Job seeker
                let jobSeeker = new JobSeeker({
                    name: args.name,
                    title: args.title,
                    email: args.email,
                    password: args.password,
                    phone: args.phone,
                });

                // Save new job seeker in DB
                return jobSeeker.save();
            },
        },
        addEmployer: {
            type: EmployerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // Employer
                let employer = new Employer({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    phone: args.phone,
                });
                // Save new employer in DB
                return employer.save();
            },
        },
        updateJobSeeker: {
            type: JobSeekerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                image: { type: new GraphQLNonNull(GraphQLString) },
                location: { type: new GraphQLNonNull(GraphQLString) },
                summary: { type: new GraphQLNonNull(GraphQLString) },
                skills: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                // Edit job seeker in DB
                const jobSeeker = JobSeeker.findByIdAndUpdate(
                    args.id,
                    {
                        title: args.title,
                        phone: args.phone,
                        image: args.image,
                        location: args.location,
                        skills: args.skills.split(","),
                        experience: args.experience,
                        summary: args.summary,
                    },
                    { useFindAndModify: true }
                );

                return jobSeeker;
            },
        },
    },
});

// Export Root Query and Mutation
module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
