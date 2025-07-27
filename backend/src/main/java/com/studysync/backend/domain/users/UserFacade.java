package com.studysync.backend.domain.users;

import java.util.List;

import org.springframework.stereotype.Service;

import com.studysync.backend.domain.users.service.UsersService;
import com.studysync.backend.domain.users.service.groups.GroupsService;
import com.studysync.backend.domain.users.service.scrap.GroupScrapService;
import com.studysync.backend.domain.users.model.Groups;
import com.studysync.backend.domain.users.model.Users;

@Service
public class UserFacade {
	private final UsersService userService;
	private final GroupsService groupService;
    private final GroupScrapService groupScrapService;
	
    public UserFacade(UsersService userService,GroupsService groupService, GroupScrapService groupScrapService) {
		this.userService = userService;
		this.groupService = groupService;
		this.groupScrapService = groupScrapService;
	}
    
    // UsersService
    public int registerUser(Users user) {
        return userService.register(user);
    }

    public Users login(String id, String pw) {
        return userService.login(id, pw);
    }

    public Users findUserById(String id) {
        return userService.findById(id);
    }

    public void changeNickname(String id, String nickname) {
    	userService.changeNickname(id, nickname);
    }
    
    // GroupScrapService
    public List<Long> getScrappedGroupIds(String userId) {
        return groupScrapService.getScrappedGroupIds(userId);
    }

    public List<Groups> getScrapGroupList(String userId) {
        return groupScrapService.getScrapGroupList(userId);
    }
    
    // GroupService
    public List<Groups> getMyGroups(String userId){
    	return groupService.getMyGroups(userId);
    }
    
}

