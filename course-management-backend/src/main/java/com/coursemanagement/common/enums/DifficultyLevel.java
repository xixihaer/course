package com.coursemanagement.common.enums;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DifficultyLevel {
    BEGINNER("BEGINNER", "初级"),
    INTERMEDIATE("INTERMEDIATE", "中级"),
    ADVANCED("ADVANCED", "高级");

    @EnumValue
    @JsonValue
    private final String code;
    private final String description;
}