package com.coursemanagement.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName(value = "teachers", autoResultMap = true)
public class Teacher extends BaseEntity {
    
    @TableField("user_id")
    private Long userId;
    
    @TableField("teacher_number")
    private String teacherNumber;
    
    @TableField("institution_id")
    private Long institutionId;
    
    @TableField(value = "subjects", typeHandler = JacksonTypeHandler.class)
    private List<String> subjects;
    
    @TableField("experience_years")
    private Integer experienceYears;
    
    @TableField("qualification")
    private String qualification;
    
    @TableField("introduction")
    private String introduction;
    
    @TableField(exist = false)
    private User user;
    
    @TableField(exist = false)
    private Institution institution;
}