package com.coursemanagement.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("students")
public class Student extends BaseEntity {
    
    @TableField("user_id")
    private Long userId;
    
    @TableField("student_number")
    private String studentNumber;
    
    @TableField("grade")
    private String grade;
    
    @TableField("school")
    private String school;
    
    @TableField("parent_name")
    private String parentName;
    
    @TableField("parent_phone")
    private String parentPhone;
    
    @TableField(exist = false)
    private User user;
}