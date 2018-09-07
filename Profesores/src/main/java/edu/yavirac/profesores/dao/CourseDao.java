package edu.yavirac.profesores.dao;

import java.util.List;

import edu.yavirac.profesores.model.Course;;

public interface CourseDao {
	void saveCourse(Course course);
	
	void deleteCourseById(Long idCourse);
	
	void updateCourse(Course course);
	
	List<Course> findAllCourses();
	
	Course findById(Long idCourse);
	
	Course findByName(String name);
	
	List<Course> findByIdTeacher(Long idTeacher);
}
