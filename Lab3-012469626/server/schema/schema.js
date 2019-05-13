const graphql = require('graphql');
var mongoose = require('mongoose');
const Courses = require('../../models/courseDetails');
const Profile =require('../../models/loginData');

mongoose.connect('mongodb+srv://canvas:canvas@cluster0-l7vjn.mongodb.net/test?retryWrites=true');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphql;





const SignUpRes = new GraphQLObjectType({
    name: 'SignUpRes',
    fields: () => ({
        message: {type: GraphQLBoolean}
    })
})

const ccres = new GraphQLObjectType({
    name: 'ccres',
    fields: () => ({
        message: {type: GraphQLBoolean}
    })
})

const SignInRes = new GraphQLObjectType({
    name: 'SignInRes',
    fields: () => ({
        message: {type: GraphQLBoolean}     
    })
})

const Course = new GraphQLObjectType({
    name: 'Courses',
    fields: () => ({
        courseID: {type: GraphQLString},
        courseName: {type: GraphQLString}
    })
});

const UpdateProfileRes = new GraphQLObjectType({
    name: 'UpdateProfileRes',
    fields: () => ({
        message: {type: GraphQLBoolean}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        signIn: {
            type: SignInRes,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                role: {type: GraphQLString}
            },
            resolve(parent, args){
                if(args.category == 'Faculty'){
                    console.log('HELLO');
            
                    var query = {email: args.email, password: args.password};
                    logindata.find(query).exec().then(res=>{
                        console.log(res);
                        if(res.length>0){
                            syncOne();
                        }
                        else{
                            syncTwo();   
                        }
                    }).catch(err => {
                        console.log(err);
                        syncTwo();
                    })
                    
                }
                
                else if(args.role == 'S'){
                    var query = {email: args.email, password: args.password};
                    logindata.find(query).exec().then(res=>{
                        console.log(res);
                        if(res.length>0){
                            syncOne();
                        }
                        else{
                            syncTwo();   
                        }
                        
                    }).catch(err => {
                        console.log(err);
                        syncTwo();
                    })
                }
                function syncOne(){
                    return true;
                }
            
                function syncTwo(){
                    return false;
                }
            }
        },

        coursesEnrolled: {
            type: Course,
            args: {
                email: {type: GraphQLString}
            },
            resolve(parent, args){
                var query = {email: args.email, status: 'E'};
                enrolled.find(query).exec().then(result=>{
                    console.log(result);
                    return result;
                }).catch(err=>console.log(err));
            }
        },

        courseCreated: {
            type: Course,
            args: {
                email: {type: GraphQLString}
            },
            resolve(parent, args){
                var query = {email: args.email};
                coursedetails.find(query).exec().then(result=>{
                    console.log(result);
                    return result;
                }).catch(err=>console.log(err));
            }
        }
    })
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createCourse: {
            type: ccresult,
            args: {
                email: {type: GraphQLString},
                courseid: {type: GraphQLString},
                coursename: {type: GraphQLString},
                coursedept: {type: GraphQLString},
                coursedes: {type: GraphQLString},
                courseroom: {type: GraphQLString},
                coursecapacity: {type: GraphQLInt},
                waitlistcapacity: {type: GraphQLInt},
            },
            resolve(parent, args){
                const entry = new Courses({
                    _id: new mongoose.Types.ObjectId(),
                    email: {type: GraphQLString},
                    courseid: {type: GraphQLString},
                    coursename: {type: GraphQLString},
                    coursedept: {type: GraphQLString},
                    coursedes: {type: GraphQLString},
                    courseroom: {type: GraphQLString},
                    coursecapacity: {type: GraphQLInt},
                    waitlistcapacity: {type: GraphQLInt},
                })
                
                entry.save().then(result=>{
                    console.log(result);

                }).catch(err=>{console.log(err); callback(err, null);});
            
                return true;
            }
        },

        signUp: {
            type: SignUpResult,
            args: {
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                role: {type: GraphQLString}
            },
            resolve(parent, args){
                if(args.role == 'F'){
                    logindata.find({email: args.email}).exec().then(result=>{
                        if(result.length > 0){
                            return false
                        }
                        else{
                            if(args.email && args.password){
                            const entry = new Profile({
                                _id: new mongoose.Types.ObjectId(),
                                name: args.name,
                                username: args.email,
                                password: md5(args.password),
                                phone: '',
                                aboutme: '',
                                city: '',
                                country: '',
                                company: '',
                                school: '',
                                hometown: '',
                                languages: '',
                                gender: '',
                                picture: ''
                            })
                            console.log('Entered');
                            entry.save().then(result=>{
                                console.log(result);
                                return true;
                            })
                            .catch(err => console.log(err));}
                        }   
                    })
                }
                
                        
                else if(args.category == 'S'){
                    logindata.find({username: args.email}).exec().then(result=>{
                        if(result.length > 0){
                            return false;
                        }
                        else{
                            if(args.email && args.password){
                            const entry = new Profile({
                                _id: new mongoose.Types.ObjectId(),
                                name: args.name,
                                username: args.email,
                                password: md5(args.password),
                                phone: '',
                                aboutme: '',
                                city: '',
                                country: '',
                                company: '',
                                school: '',
                                hometown: '',
                                languages: '',
                                gender: '',
                                picture: ''
                            })
                            console.log('Entered');
                            entry.save().then(result=>{
                                console.log(result);
                                return true;
                            })
                            .catch(err => console.log(err));}
                            // res.send(true);
                        }
                    })  
                }      
            }
        },


        updateProfile: {
            type: UpdateProfileResult,
            args: {
                username: {type: GraphQLString}, 
                name: {type: GraphQLString}, 
                password: {type: GraphQLString}, 
                phone: {type: GraphQLString}, 
                aboutme: {type: GraphQLString}, 
                city: {type: GraphQLString}, 
                country: {type: GraphQLString}, 
                company: {type: GraphQLString}, 
                school: {type: GraphQLString}, 
                hometown: {type: GraphQLString}, 
                languages: {type: GraphQLString},
                gender: {type: GraphQLString}
            },
            resolve(parent, args){
                var query='';
                if(password === ''){
                    query = {$set: {name: args.name, phone: args.phone, about: args.about, city: args.city, country: args.country, company: args.company, school: args.school, hometown: args.hometown, languages: args.languages, gender: args.gender}};
                    
                    syncFunc();
                }
                else{
                    query = {$set: {name: args.name, password: args.password, phone: args.phone, about: args.about, city: args.city, country: args.country, company: args.company, school: args.school, hometown: args.hometown, languages: args.languages, gender: args.gender}};
                    
                    syncFunc();
                }

                function syncFunc(){
                    logindata.update({email: email}, query).exec().then(result=>{
                        console.log(result);
                    }).catch(err=>console.log(err));
                    return true;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});