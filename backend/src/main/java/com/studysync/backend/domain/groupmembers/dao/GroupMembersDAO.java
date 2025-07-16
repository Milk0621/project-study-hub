package com.studysync.backend.domain.groupmembers.dao;

import com.studysync.backend.domain.groupmembers.model.GroupMembers;

public interface GroupMembersDAO {
	//그룹 참여
	int insertGroupMem(GroupMembers groupMembers);
}
