package com.coursemanagement.common.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserType {
    STUDENT("STUDENT", "学生"),
    TEACHER("TEACHER", "教师"),
    ADMIN("ADMIN", "系统管理员"),
    INSTITUTION_ADMIN("INSTITUTION_ADMIN", "机构管理员");

    @EnumValue
    @JsonValue
    private final String code;
    private final String description;
}