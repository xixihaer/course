package com.coursemanagement.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.coursemanagement.entity.Teacher;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface TeacherMapper extends BaseMapper<Teacher> {
    
    Teacher findByUserId(@Param("userId") Long userId);
    
    IPage<Teacher> selectTeacherPage(Page<Teacher> page, @Param("institutionId") Long institutionId, @Param("keyword") String keyword);
}