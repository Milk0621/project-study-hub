package com.studysync.backend.domain.groups.service.member;

import com.studysync.backend.domain.groups.model.GroupMembers;

public interface GroupMembersService {
	//그룹 참여
	int joinGroup(GroupMembers groupMembers);
	//그룹 참여 여부 조회
	GroupMembers checkJoin(int groupId, String userId);
}
