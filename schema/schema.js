const graphql = require("graphql");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID,
} = graphql;

const Job = require("../models/Job");
const JobSeeker = require("../models/JobSeeker");
const Employer = require("../models/Employer");
const Experience = require("../models/Experience");

const _ = require("lodash");

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
                return JobSeeker.find({
                    name: new RegExp(args.employeeName, "i"),
                    title: new RegExp(args.employeeTitle, "i"),
                });
            },
        },
        jobSeekers: {
            type: new GraphQLList(JobSeekerType),
            resolve(parent, args) {
                return JobSeeker.find({});
            },
        },
    },
});

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

                return job.save();
            },
        },
        addJobSeeker: {
            type: JobSeekerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                // title: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLString },
                // image: { type: GraphQLString },
                // location: { type: GraphQLString },
                // summary: { type: GraphQLString },
                // experience: { type: GraphQLList(GraphQLString) },
                // skills: {
                //     type: GraphQLList(GraphQLString),
                // },
            },
            resolve(parent, args) {
                let jobSeeker = new JobSeeker({
                    name: args.name,
                    title: args.title,
                    email: args.email,
                    password: args.password,
                    phone: args.phone,
                    // image: args.image,
                    // location: args.location,
                    // summary: args.summary,
                    // experience: args.experience,
                    // skills: args.skills,
                });
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
                console.log(parent);
                let employer = new Employer({
                    name: args.name,
                    email: args.email,
                    password: args.password,
                    phone: args.phone,
                });

                return employer.save();
            },
        },
        updateJobSeeker: {
            type: JobSeekerType,
            args: {
                id: { type: GraphQLString },
                title: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLString },
                image: { type: GraphQLString },
                location: { type: GraphQLString },
                summary: { type: GraphQLString },
                skills: {
                    type: GraphQLList(GraphQLString),
                },
            },
            resolve(parent, args) {
                const jobSeeker = JobSeeker.findByIdAndUpdate(
                    args.id,
                    {
                        title: args.title,
                        phone: args.phone,
                        image: args.image,
                        location: args.location,
                        skills: args.skills,
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

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
