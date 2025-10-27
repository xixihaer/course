package com.coursemanagement.common.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CourseType {
    ONE_ON_ONE("ONE_ON_ONE", "一对一"),
    SMALL_CLASS("SMALL_CLASS", "小班课"),
    LARGE_CLASS("LARGE_CLASS", "大班课");

    @EnumValue
    @JsonValue
    private final String code;
    private final String description;
}