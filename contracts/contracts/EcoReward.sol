// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EcoToken - Simple ERC20 Token
 * @dev Simple ERC20 token with fixed supply
 * 
 * Token Details:
 * - Name: Eco Reward
 * - Symbol: ECO
 * - Total Supply: 10 billion tokens
 * - Decimals: 18 (standard)
 */
contract EcoToken is ERC20, Ownable {
    
    // Total supply: 10 billion tokens
    uint256 public constant TOTAL_SUPPLY = 10_000_000_000 * 10**18;
    
    /**
     * @dev Constructor that mints the total supply to the deployer
     * @param initialOwner Address that will own the contract
     */
    constructor(address initialOwner) 
        ERC20("Eco Reward", "ECO") 
        Ownable(initialOwner)
    {
        // Mint all tokens to the initial owner
        _mint(initialOwner, TOTAL_SUPPLY);
    }
    
    /**
     * @dev Mint new tokens (only owner can mint)
     * @param to Address to receive the tokens
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
    
    /**
     * @dev Burn tokens from caller's balance
     * @param amount Amount of tokens to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
    
    /**
     * @dev Get token information
     */
    function getTokenInfo() external view returns (
        string memory tokenName,
        string memory tokenSymbol,
        uint256 tokenDecimals,
        uint256 tokenTotalSupply
    ) {
        return (
            name(),
            symbol(), 
            decimals(),
            totalSupply()
        );
    }
}