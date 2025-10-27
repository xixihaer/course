package com.coursemanagement.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.coursemanagement.common.enums.CourseType;
import com.coursemanagement.common.enums.DifficultyLevel;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("courses")
public class Course extends BaseEntity {
    
    @TableField("name")
    private String name;
    
    @TableField("subject")
    private String subject;
    
    @TableField("description")
    private String description;
    
    @TableField("teacher_id")
    private Long teacherId;
    
    @TableField("institution_id")
    private Long institutionId;
    
    @TableField("course_type")
    private CourseType courseType;
    
    @TableField("max_students")
    private Integer maxStudents;
    
    @TableField("price")
    private BigDecimal price;
    
    @TableField("duration_minutes")
    private Integer durationMinutes;
    
    @TableField("difficulty_level")
    private DifficultyLevel difficultyLevel;
    
    @TableField("status")
    private Integer status;
    
    @TableField(exist = false)
    private Teacher teacher;
    
    @TableField(exist = false)
    private Institution institution;
}