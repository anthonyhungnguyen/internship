package com.example.ngph.controller;

import com.example.ngph.model.Group;
import com.example.ngph.repository.GroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class GroupController {
    private final Logger log = LoggerFactory.getLogger(GroupController.class);
    private final GroupRepository groupRepository;

    @Autowired
    public GroupController(GroupRepository groupService) {
        this.groupRepository = groupService;
    }

    @GetMapping("groups")
    List<Group> groups() {
        return groupRepository.findAll();
    }

    @GetMapping("group/{id}")
    Group getGroup(@PathVariable Long id) throws Exception {
        Optional<Group> group = groupRepository.findById(id);
        return group.orElseThrow(() -> new Exception("Group Not Found"));
    }

    @PostMapping("group")
    Group createGroup(@Validated @RequestBody Group group) {
        log.info("Request to create group: {}", group);
        return groupRepository.save(group);
    }

    @PutMapping("group/{id}")
    Group updateGroup(@Validated @RequestBody Group group) {
        log.info("Request to update group: {}", group);
        return groupRepository.save(group);
    }

    @DeleteMapping("group/{id}")
    void deleteGroup(@PathVariable Long id) throws Exception {
        log.info("Request to delete group id: {}", id);
        if (groupRepository.existsById(id)) {
            groupRepository.deleteById(id);
        } else {
            throw new Exception("Group ID Not Found");
        }
    }
}
