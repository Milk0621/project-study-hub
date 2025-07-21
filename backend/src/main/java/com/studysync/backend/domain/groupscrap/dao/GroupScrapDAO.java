package com.studysync.backend.domain.groupscrap.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface GroupScrapDAO {
	void deleteScrap(@Param("userId") String userId, @Param("groupId") Long groupId);
	void addScrap(@Param("userId") String userId, @Param("groupId") Long groupId);
	List<Long> selectScrapList(String userId);
}
