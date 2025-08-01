package com.studysync.backend.domain.groups.dao.member;

import com.studysync.backend.domain.groups.model.GroupMembers;

public interface GroupMembersDAO {
	//그룹 참여
	int insertGroupMem(GroupMembers groupMembers);
	//그룹 참여 여부 조회
	GroupMembers selectGroupMemOne(int groupId, String userId);
}
