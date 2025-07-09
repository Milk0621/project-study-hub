package com.studysync.backend.dao;

import org.apache.ibatis.annotations.Param;

import com.studysync.backend.model.Users;

public interface UsersDAO {
	//회원가입
	int insertUser(Users users);
	
	//로그인
	Users findByIdAndPassword(@Param("id") String id, @Param("pw") String pw);
	
	//유저 조회
}
