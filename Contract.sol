// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract DecentralizedResumeBuilder {
    struct Resume {
        string name;
        string contactInfo;
        string[] skills;
        string[] experience;
        string[] education;
        string additionalInfo;
    }

    mapping(address => Resume) private resumes;
    mapping(address => bool) public registeredUsers;

    event ResumeCreated(address indexed user);
    event ResumeUpdated(address indexed user);

    modifier onlyRegistered() {
        require(registeredUsers[msg.sender], "User not registered");
        _;
    }

    function registerUser() public {
        require(!registeredUsers[msg.sender], "User already registered");
        registeredUsers[msg.sender] = true;
    }

    function createOrUpdateResume(
        string memory name,
        string memory contactInfo,
        string[] memory skills,
        string[] memory experience,
        string[] memory education,
        string memory additionalInfo
    ) public onlyRegistered {
        resumes[msg.sender] = Resume(name, contactInfo, skills, experience, education, additionalInfo);
        emit ResumeUpdated(msg.sender);
    }

    function getResume(address user) public view returns (
        string memory, 
        string memory, 
        string[] memory, 
        string[] memory, 
        string[] memory, 
        string memory
    ) {
        require(registeredUsers[user], "User not registered");
        Resume storage resume = resumes[user];
        return (
            resume.name,
            resume.contactInfo,
            resume.skills,
            resume.experience,
            resume.education,
            resume.additionalInfo
        );
    }
}
