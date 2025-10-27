package com.coursemanagement.controller;

import com.coursemanagement.common.PageResult;
import com.coursemanagement.common.Result;
import com.coursemanagement.dto.UserCreateDTO;
import com.coursemanagement.dto.UserUpdateDTO;
import com.coursemanagement.service.UserService;
import com.coursemanagement.vo.UserVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(name = "用户管理", description = "用户管理相关接口")
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @Operation(summary = "创建用户")
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Result<UserVO> createUser(@Validated @RequestBody UserCreateDTO createDTO) {
        UserVO userVO = userService.createUser(createDTO);
        return Result.success(userVO);
    }

    @Operation(summary = "更新用户")
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public Result<UserVO> updateUser(@PathVariable Long id, @Validated @RequestBody UserUpdateDTO updateDTO) {
        UserVO userVO = userService.updateUser(id, updateDTO);
        return Result.success(userVO);
    }

    @Operation(summary = "删除用户")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Result<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return Result.success();
    }

    @Operation(summary = "分页查询用户")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Result<PageResult<UserVO>> pageUsers(
            @Parameter(description = "当前页") @RequestParam(defaultValue = "1") Integer current,
            @Parameter(description = "页大小") @RequestParam(defaultValue = "10") Integer size,
            @Parameter(description = "搜索关键字") @RequestParam(required = false) String keyword) {
        PageResult<UserVO> pageResult = userService.pageUsers(current, size, keyword);
        return Result.success(pageResult);
    }

    @Operation(summary = "获取用户详情")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public Result<UserVO> getUserInfo(@PathVariable Long id) {
        UserVO userVO = userService.getUserInfo(id);
        return Result.success(userVO);
    }

    @Operation(summary = "重置密码")
    @PostMapping("/{id}/reset-password")
    @PreAuthorize("hasRole('ADMIN')")
    public Result<Void> resetPassword(@PathVariable Long id, @RequestParam String newPassword) {
        userService.resetPassword(id, newPassword);
        return Result.success();
    }

    @Operation(summary = "修改密码")
    @PostMapping("/{id}/change-password")
    @PreAuthorize("#id == authentication.principal.id")
    public Result<Void> changePassword(@PathVariable Long id, 
                                     @RequestParam String oldPassword, 
                                     @RequestParam String newPassword) {
        userService.changePassword(id, oldPassword, newPassword);
        return Result.success();
    }
}