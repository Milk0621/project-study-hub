package com.studysync.backend.domain.groups.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.studysync.backend.domain.groups.model.Groups;

public interface GroupsDAO {
	// 그룹 생성
	int insertGroup(Groups groups);
	// 그룹 전체 조회
	List<Groups> selectAllGroups();
	// 그룹 단건 조회
	Groups selectOneGroup(int id);
	// 그룹 수정
	int updateGroup(Groups groups);
	// 내가 만든 그룹 조회
	List<Groups> selectMyGroups(String id);
	// 그룹 검색
	List<Groups> searchGroups(@Param("search") String search, @Param("category") String category);
}
