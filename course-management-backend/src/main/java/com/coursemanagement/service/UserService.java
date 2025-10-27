package com.coursemanagement.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.coursemanagement.common.PageResult;
import com.coursemanagement.dto.UserCreateDTO;
import com.coursemanagement.dto.UserUpdateDTO;
import com.coursemanagement.entity.User;
import com.coursemanagement.vo.UserVO;

public interface UserService extends IService<User> {
    
    User findByUsername(String username);
    
    User findByPhone(String phone);
    
    User findByEmail(String email);
    
    UserVO createUser(UserCreateDTO createDTO);
    
    UserVO updateUser(Long id, UserUpdateDTO updateDTO);
    
    void deleteUser(Long id);
    
    PageResult<UserVO> pageUsers(Integer current, Integer size, String keyword);
    
    UserVO getUserInfo(Long id);
    
    void resetPassword(Long id, String newPassword);
    
    void changePassword(Long id, String oldPassword, String newPassword);
}