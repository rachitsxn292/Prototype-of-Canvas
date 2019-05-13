import { gql } from 'apollo-boost';

const logInQuery = gql`
   query signIn($username: String, $password: String, $role: String){
        signIn(username: $username, password: $password, role: $role){
            message
        }
    }
`;

const EnrolledQuery = gql`
   query courseEnrolled($email: String){
        courseEnrolled(email: $email){
            courseID,
            coursename
        }
    }
`;

const CreateCourseQuery = gql`
   query courseCreated($email: String){
        courseCreated(email: $email){
            courseID,
            coursename
        }
    }
`;

export { logInQuery, EnrolledQuery, CreateCourseQuery };