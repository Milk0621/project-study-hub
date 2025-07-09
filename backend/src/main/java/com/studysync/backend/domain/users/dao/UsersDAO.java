package com.studysync.backend.domain.users.dao;

import org.apache.ibatis.annotations.Param;

import com.studysync.backend.domain.users.model.Users;

public interface UsersDAO {
	//회원가입
	int insertUser(Users users);
	
	//로그인
	Users findByIdAndPassword(@Param("id") String id, @Param("pw") String pw);
	
	//유저 조회
}
