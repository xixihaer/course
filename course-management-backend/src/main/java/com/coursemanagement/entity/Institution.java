package com.coursemanagement.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("institutions")
public class Institution extends BaseEntity {
    
    @TableField("name")
    private String name;
    
    @TableField("description")
    private String description;
    
    @TableField("address")
    private String address;
    
    @TableField("phone")
    private String phone;
    
    @TableField("email")
    private String email;
    
    @TableField("license_number")
    private String licenseNumber;
    
    @TableField("website")
    private String website;
    
    @TableField("logo")
    private String logo;
    
    @TableField("status")
    private Integer status;
}