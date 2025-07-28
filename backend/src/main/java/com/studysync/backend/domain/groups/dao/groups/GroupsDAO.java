package com.studysync.backend.domain.groups.dao.groups;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.studysync.backend.domain.groups.model.Groups;
import com.studysync.backend.dto.GroupPasswordCheckDTO;

public interface GroupsDAO {
	// 그룹 생성
	int insertGroup(Groups groups);
	// 그룹 단건 조회
	Groups selectOneGroup(int id);
	GroupPasswordCheckDTO selectGroupPasswordInfo(Long groupId);
	// 그룹 목록
	List<Groups> getGroups(@Param("search") String search, @Param("category") String category, @Param("limit") int limit, @Param("offset") int offset);
	// 그룹 수
	int countGroups(@Param("search") String search, @Param("category") String category);
	// 내가 속한 그룹
	List<Groups> selectUserGroups(String userId);
	// 조회수 증가
	void increaseViewCount(Long id);
	// 글 수정
	int updateGroup(int id, Groups updateGroup);
}