package com.studysync.backend.domain.groupmembers.service;

import com.studysync.backend.domain.groupmembers.model.GroupMembers;

public interface GroupMembersService {
	//그룹 참여
	int joinGroup(GroupMembers groupMembers);
	//그룹 참여 여부 조회
	GroupMembers checkJoin(int groupId, String userId);
}
