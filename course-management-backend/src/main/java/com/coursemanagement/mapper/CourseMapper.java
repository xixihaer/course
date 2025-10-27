package com.coursemanagement.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.coursemanagement.entity.Course;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface CourseMapper extends BaseMapper<Course> {
    
    IPage<Course> selectCoursePage(Page<Course> page, 
                                  @Param("teacherId") Long teacherId,
                                  @Param("institutionId") Long institutionId,
                                  @Param("subject") String subject,
                                  @Param("keyword") String keyword);
}