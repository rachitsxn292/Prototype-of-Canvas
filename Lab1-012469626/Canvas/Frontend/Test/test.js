var assert = require('chai').assert;
var app = require('../Login/loginExpress');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('View Classmates', function(){

    it('GET /viewPeople',function(){
        agent.get('/viewPeople').query({courseid: 'admin'})
            .then(function(res){
                expect(res.body[0].COURSEID).to.equal('admin');
            });
    });
})

describe('Course', function(){

    it('GET /getCourses',function(){
        agent.get('/getCourses').query({courseid: 'admin'})
            .then(function(res){
                expect(res.body[0].COURSEID).to.equal('admin');
            });
    });
})
describe('View Students', function(){

    it('GET /viewStudents',function(){
        agent.get('/viewStudents').query({courseid: 'admin'})
            .then(function(res){
                expect(res.body[0].COURSEID).to.equal('admin');
            });
    });
})
describe('Uploads', function(){

    it('GET /uploadView',function(){
        agent.get('/uploadView').query({courseid: 'admin'})
            .then(function(res){
                expect(res.body[0].COURSEID).to.equal('admin');
            });
    });
})
describe('Assignment View', function(){

    it('GET /assignmentView',function(){
        agent.get('/assignmentView').query({courseid: 'admin'})
            .then(function(res){
                expect(res.body[0].COURSEID).to.equal('admin');
            });
    });
})
