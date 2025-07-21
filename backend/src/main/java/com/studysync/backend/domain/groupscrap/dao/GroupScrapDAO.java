package com.studysync.backend.domain.groupscrap.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.studysync.backend.domain.groups.model.Groups;

public interface GroupScrapDAO {
	void deleteScrap(@Param("userId") String userId, @Param("groupId") Long groupId);
	void addScrap(@Param("userId") String userId, @Param("groupId") Long groupId);
	List<Long> selectScrapIds(String userId);
	List<Groups> selectScrapList(String userId);
}
