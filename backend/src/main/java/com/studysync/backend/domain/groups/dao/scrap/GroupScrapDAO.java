package com.studysync.backend.domain.groups.dao.scrap;

import org.apache.ibatis.annotations.Param;

public interface GroupScrapDAO {
	void deleteScrap(@Param("userId") String userId, @Param("groupId") Long groupId);
	void addScrap(@Param("userId") String userId, @Param("groupId") Long groupId);
}
