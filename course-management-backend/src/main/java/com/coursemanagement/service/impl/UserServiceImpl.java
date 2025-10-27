package com.coursemanagement.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.coursemanagement.common.PageResult;
import com.coursemanagement.dto.UserCreateDTO;
import com.coursemanagement.dto.UserUpdateDTO;
import com.coursemanagement.entity.User;
import com.coursemanagement.exception.BusinessException;
import com.coursemanagement.mapper.UserMapper;
import com.coursemanagement.service.UserService;
import com.coursemanagement.utils.BeanCopyUtils;
import com.coursemanagement.vo.UserVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User findByUsername(String username) {
        return userMapper.findByUsername(username);
    }

    @Override
    public User findByPhone(String phone) {
        return userMapper.findByPhone(phone);
    }

    @Override
    public User findByEmail(String email) {
        return userMapper.findByEmail(email);
    }

    @Override
    @Transactional
    public UserVO createUser(UserCreateDTO createDTO) {
        if (findByUsername(createDTO.getUsername()) != null) {
            throw new BusinessException("用户名已存在");
        }
        
        if (StringUtils.isNotBlank(createDTO.getPhone()) && findByPhone(createDTO.getPhone()) != null) {
            throw new BusinessException("手机号已存在");
        }
        
        if (StringUtils.isNotBlank(createDTO.getEmail()) && findByEmail(createDTO.getEmail()) != null) {
            throw new BusinessException("邮箱已存在");
        }

        User user = BeanCopyUtils.copyBean(createDTO, User.class);
        user.setPassword(passwordEncoder.encode(createDTO.getPassword()));
        user.setStatus(1);
        
        save(user);
        
        return BeanCopyUtils.copyBean(user, UserVO.class);
    }

    @Override
    @Transactional
    public UserVO updateUser(Long id, UserUpdateDTO updateDTO) {
        User user = getById(id);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        
        if (StringUtils.isNotBlank(updateDTO.getPhone())) {
            User existUser = findByPhone(updateDTO.getPhone());
            if (existUser != null && !existUser.getId().equals(id)) {
                throw new BusinessException("手机号已存在");
            }
        }
        
        if (StringUtils.isNotBlank(updateDTO.getEmail())) {
            User existUser = findByEmail(updateDTO.getEmail());
            if (existUser != null && !existUser.getId().equals(id)) {
                throw new BusinessException("邮箱已存在");
            }
        }

        BeanCopyUtils.copyProperties(updateDTO, user);
        updateById(user);
        
        return BeanCopyUtils.copyBean(user, UserVO.class);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        User user = getById(id);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        removeById(id);
    }

    @Override
    public PageResult<UserVO> pageUsers(Integer current, Integer size, String keyword) {
        Page<User> page = new Page<>(current, size);
        
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        if (StringUtils.isNotBlank(keyword)) {
            wrapper.like(User::getUsername, keyword)
                   .or().like(User::getRealName, keyword)
                   .or().like(User::getPhone, keyword)
                   .or().like(User::getEmail, keyword);
        }
        wrapper.orderByDesc(User::getCreatedAt);
        
        IPage<User> pageResult = page(page, wrapper);
        List<UserVO> records = BeanCopyUtils.copyBeanList(pageResult.getRecords(), UserVO.class);
        
        return PageResult.of(records, pageResult.getTotal(), pageResult.getCurrent(), pageResult.getSize());
    }

    @Override
    public UserVO getUserInfo(Long id) {
        User user = getById(id);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        return BeanCopyUtils.copyBean(user, UserVO.class);
    }

    @Override
    @Transactional
    public void resetPassword(Long id, String newPassword) {
        User user = getById(id);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        updateById(user);
    }

    @Override
    @Transactional
    public void changePassword(Long id, String oldPassword, String newPassword) {
        User user = getById(id);
        if (user == null) {
            throw new BusinessException("用户不存在");
        }
        
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new BusinessException("原密码错误");
        }
        
        user.setPassword(passwordEncoder.encode(newPassword));
        updateById(user);
    }
}