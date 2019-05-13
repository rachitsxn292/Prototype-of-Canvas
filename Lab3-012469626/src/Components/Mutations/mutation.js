import { gql } from 'apollo-boost';

const createCourseMutation = gql`
    mutation CreateCourse($email: String, $courseid: String, $coursename: String, $coursedept: String, $coursedes: String, $courseroom: String, $coursecapacity: Int, $waitlistcapacity: Int){
        createCourse(email: $email, courseid: $courseid, coursename: $coursename, coursedept: $coursedept, coursedes: $coursedesc, courseroom: $courseroom, coursecapacity: $coursecapacity, waitlistcapacity: $waitlistcapacity){
            message
        }
    }
`;

const signUpMutation = gql`
    mutation signUp($name: String, $username: String, $password: String, $role: String){
        signUp(name: $name, username: $username, password: $password, category: $role){
            message
        }
    }
`;

const updateProfileFMutation = gql`
    mutation updateProfile($email: String, $name: String, $password: String, $phone: String, $about: String, $city: String, $country: String, $company: String, $school: String, $hometown: String, $languages: String, $gender: String){
        updateProfile(email: $email, name: $name, password: $password, phone: $phone, about: $about, city: $city, country: $country, company: $company, school: $school, hometown: $hometown, languages: $languages, gender: $gender){
            message
        }
    }
`;



export { createCourseMutation, signUpMutation, updateProfileFMutatio };