// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title EcoUser
 * @dev Simple contract for user registration with Privy DID
 */
contract EcoUser {
    
    // Events
    event UserRegistered(address indexed smartAddress, string privyDID, string name, string imageUrl, uint256 timestamp);
    event UserUpdated(string indexed _privyDID, string name, string imageUrl, uint256 timestamp);
    
    // Structs
    struct User {
        string privyDID;      // Privy DID identifier
        string name;          // User display name
        address smartAddress; // User's smart contract address
        string imageUrl;      // Profile image URL
        string salt;          // Salt used for smart address generation
        uint256 timestamp;    // Registration timestamp
    }
    
    // State variables
    mapping(string => User) public users;
    mapping(string => address) public privyDIDToAddress;
    
    address[] public userAddresses;
    uint256 public totalUsers;
    
    // Modifiers
    modifier validPrivyDID(string memory _privyDID) {
        require(bytes(_privyDID).length > 0, "Invalid Privy DID");
        require(privyDIDToAddress[_privyDID] == address(0), "Privy DID already registered");
        _;
    }
    
    modifier onlyRegisteredUser(string memory _privyDID) {
        require(bytes(users[_privyDID].privyDID).length > 0, "User not registered");
        _;
    }
    
    /**
     * @dev Register new user
     * @param _privyDID Unique Privy DID identifier
     * @param _name User display name
     * @param _imageUrl Profile image URL
     * @param _smartAddress User's smart contract address
     * @param _salt Salt used for smart address generation
     */
    function registerUser(
        string memory _privyDID,
        string memory _name,
        string memory _imageUrl,
        address _smartAddress,
        string memory _salt
    ) external validPrivyDID(_privyDID) {
        require(bytes(users[_privyDID].privyDID).length == 0, "User already registered");
        require(bytes(_name).length > 0, "Name required");
        require(_smartAddress != address(0), "Invalid smart address");
        require(bytes(_salt).length > 0, "Invalid salt");
        
        users[_privyDID] = User({
            privyDID: _privyDID,
            name: _name,
            smartAddress: _smartAddress,
            imageUrl: _imageUrl,
            salt: _salt,
            timestamp: block.timestamp
        });
        
        privyDIDToAddress[_privyDID] = _smartAddress;
        userAddresses.push(_smartAddress);
        totalUsers++;
        
        emit UserRegistered(_smartAddress, _privyDID, _name, _imageUrl, block.timestamp);
    }
    
    /**
     * @dev Update user profile
     * @param _name New display name
     * @param _imageUrl New profile image URL
     * @param _privyDID User's smart contract address
     */
    function updateUser(
        string memory _name,
        string memory _imageUrl,
        string memory _privyDID
    ) external onlyRegisteredUser(_privyDID) {
        require(bytes(_name).length > 0, "Name required");
        
        users[_privyDID].name = _name;
        users[_privyDID].imageUrl = _imageUrl;
        
        emit UserUpdated(_privyDID, _name, _imageUrl, block.timestamp);
    }
    
    /**
     * @dev Get user by smart contract address
     * @param _privyDID User's smart contract address
     * @return User struct
     */
    function getUser(string memory _privyDID) external view returns (User memory) {
        require(bytes(users[_privyDID].privyDID).length > 0, "User not found");
        return users[_privyDID];
    }
    
    /**
     * @dev Get user address by Privy DID
     * @param _privyDID Privy DID identifier
     * @return User's smart contract address
     */
    function getAddressByPrivyDID(string memory _privyDID) external view returns (address) {
        return privyDIDToAddress[_privyDID];
    }
    
    /**
     * @dev Check if user is registered
     * @param _privyDID User's smart contract address
     * @return True if user is registered
     */
    function isUserRegistered(string memory _privyDID ) external view returns (bool) {
        return bytes(users[_privyDID].privyDID).length > 0;
    }
    
    /**
     * @dev Get all registered user addresses
     * @return Array of user addresses
     */
    function getAllUsers() external view returns (address[] memory) {
        return userAddresses;
    }
}