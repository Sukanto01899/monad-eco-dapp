// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title EcoStaking
 * @dev Staking contract for ECO tokens with reward distribution
 */
contract EcoStaking is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    IERC20 public ecoToken;

    // Staking parameters
    uint256 public rewardRate = 100; // 100 = 1% per year (in basis points, 10000 = 100%)
    uint256 public constant REWARD_PRECISION = 10000;
    uint256 public constant SECONDS_PER_YEAR = 365 days;

    // Minimum staking period (7 days)
    uint256 public minimumStakingPeriod = 7 days;

    // Early unstaking penalty (5%)
    uint256 public earlyUnstakePenalty = 500; // 500 = 5% (in basis points)

    // Total staked in the contract
    uint256 public totalStaked;

    // Staker information
    struct StakeInfo {
        uint256 amount; // Amount staked
        uint256 startTime; // When stake started
        uint256 lastClaimTime; // Last time rewards were claimed
        uint256 rewardsEarned; // Total rewards earned but not claimed
    }

    // Mapping from user address to their stake info
    mapping(address => StakeInfo) public stakes;

    // Events
    event Staked(address indexed user, uint256 amount, uint256 timestamp);
    event Unstaked(
        address indexed user,
        uint256 amount,
        uint256 penalty,
        uint256 timestamp
    );
    event RewardsClaimed(
        address indexed user,
        uint256 amount,
        uint256 timestamp
    );
    event RewardRateUpdated(uint256 oldRate, uint256 newRate);
    event MinimumStakingPeriodUpdated(uint256 oldPeriod, uint256 newPeriod);
    event EarlyUnstakePenaltyUpdated(uint256 oldPenalty, uint256 newPenalty);
    event EmergencyWithdraw(
        address indexed user,
        uint256 amount,
        uint256 timestamp
    );

    /**
     * @dev Constructor
     * @param _ecoTokenAddress Address of the ECO token
     */
    constructor(address _ecoTokenAddress) Ownable(msg.sender) {
        require(_ecoTokenAddress != address(0), "Invalid token address");
        ecoToken = IERC20(_ecoTokenAddress);
    }

    /**
     * @dev Stake ECO tokens
     * @param amount Amount of tokens to stake
     */
    function stake(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "Cannot stake 0 tokens");

        StakeInfo storage userStake = stakes[msg.sender];

        // If user already has a stake, claim pending rewards first
        if (userStake.amount > 0) {
            _updateRewards(msg.sender);
        } else {
            // Initialize new stake
            userStake.startTime = block.timestamp;
            userStake.lastClaimTime = block.timestamp;
        }

        // Transfer tokens from user to contract
        ecoToken.safeTransferFrom(msg.sender, address(this), amount);

        // Update stake info
        userStake.amount += amount;
        totalStaked += amount;

        emit Staked(msg.sender, amount, block.timestamp);
    }

    /**
     * @dev Unstake ECO tokens
     * @param amount Amount of tokens to unstake
     */
    function unstake(uint256 amount) external nonReentrant {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount >= amount, "Insufficient staked amount");
        require(amount > 0, "Cannot unstake 0 tokens");

        // Update rewards before unstaking
        _updateRewards(msg.sender);

        uint256 penalty = 0;
        uint256 amountToReturn = amount;

        // Check if early unstaking penalty applies
        if (block.timestamp < userStake.startTime + minimumStakingPeriod) {
            penalty = (amount * earlyUnstakePenalty) / REWARD_PRECISION;
            amountToReturn = amount - penalty;

            // Penalty stays in contract as additional rewards for other stakers
        }

        // Update stake info
        userStake.amount -= amount;
        totalStaked -= amount;

        // If fully unstaked, reset start time
        if (userStake.amount == 0) {
            userStake.startTime = 0;
            userStake.lastClaimTime = 0;
        }

        // Transfer tokens back to user
        ecoToken.safeTransfer(msg.sender, amountToReturn);

        emit Unstaked(msg.sender, amount, penalty, block.timestamp);
    }

    /**
     * @dev Claim staking rewards
     */
    function claimRewards() external nonReentrant {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No active stake");

        // Update rewards
        _updateRewards(msg.sender);

        uint256 rewards = userStake.rewardsEarned;
        require(rewards > 0, "No rewards to claim");

        // Check contract has enough tokens for rewards
        uint256 contractBalance = ecoToken.balanceOf(address(this));
        require(
            contractBalance >= totalStaked + rewards,
            "Insufficient rewards in contract"
        );

        // Reset earned rewards
        userStake.rewardsEarned = 0;

        // Transfer rewards to user
        ecoToken.safeTransfer(msg.sender, rewards);

        emit RewardsClaimed(msg.sender, rewards, block.timestamp);
    }

    /**
     * @dev Internal function to update rewards
     * @param user Address of the user
     */
    function _updateRewards(address user) internal {
        StakeInfo storage userStake = stakes[user];

        if (userStake.amount > 0) {
            uint256 pending = calculatePendingRewards(user);
            userStake.rewardsEarned += pending;
            userStake.lastClaimTime = block.timestamp;
        }
    }

    /**
     * @dev Calculate pending rewards for a user
     * @param user Address of the user
     * @return Pending rewards amount
     */
    function calculatePendingRewards(
        address user
    ) public view returns (uint256) {
        StakeInfo memory userStake = stakes[user];

        if (userStake.amount == 0) {
            return 0;
        }

        uint256 stakingDuration = block.timestamp - userStake.lastClaimTime;
        uint256 rewards = (userStake.amount * rewardRate * stakingDuration) /
            (REWARD_PRECISION * SECONDS_PER_YEAR);

        return rewards;
    }

    /**
     * @dev Get total rewards (earned + pending) for a user
     * @param user Address of the user
     * @return Total rewards amount
     */
    function getTotalRewards(address user) external view returns (uint256) {
        StakeInfo memory userStake = stakes[user];
        return userStake.rewardsEarned + calculatePendingRewards(user);
    }

    /**
     * @dev Get stake info for a user
     * @param user Address of the user
     */
    function getStakeInfo(
        address user
    )
        external
        view
        returns (
            uint256 amount,
            uint256 startTime,
            uint256 lastClaimTime,
            uint256 rewardsEarned,
            uint256 pendingRewards,
            bool canUnstakeWithoutPenalty
        )
    {
        StakeInfo memory userStake = stakes[user];
        return (
            userStake.amount,
            userStake.startTime,
            userStake.lastClaimTime,
            userStake.rewardsEarned,
            calculatePendingRewards(user),
            block.timestamp >= userStake.startTime + minimumStakingPeriod
        );
    }

    /**
     * @dev Check if user can unstake without penalty
     * @param user Address of the user
     */
    function canUnstakeWithoutPenalty(
        address user
    ) external view returns (bool) {
        StakeInfo memory userStake = stakes[user];
        if (userStake.amount == 0) return false;
        return block.timestamp >= userStake.startTime + minimumStakingPeriod;
    }

    /**
     * @dev Calculate early unstake penalty for a user
     * @param user Address of the user
     * @param amount Amount to unstake
     */
    function calculateUnstakePenalty(
        address user,
        uint256 amount
    ) external view returns (uint256) {
        StakeInfo memory userStake = stakes[user];

        if (block.timestamp >= userStake.startTime + minimumStakingPeriod) {
            return 0;
        }

        return (amount * earlyUnstakePenalty) / REWARD_PRECISION;
    }

    /**
     * @dev Update reward rate (only owner)
     * @param newRate New reward rate (in basis points)
     */
    function setRewardRate(uint256 newRate) external onlyOwner {
        require(newRate <= 5000, "Rate too high"); // Max 50% per year
        uint256 oldRate = rewardRate;
        rewardRate = newRate;
        emit RewardRateUpdated(oldRate, newRate);
    }

    /**
     * @dev Update minimum staking period (only owner)
     * @param newPeriod New minimum staking period in seconds
     */
    function setMinimumStakingPeriod(uint256 newPeriod) external onlyOwner {
        require(newPeriod <= 90 days, "Period too long"); // Max 90 days
        uint256 oldPeriod = minimumStakingPeriod;
        minimumStakingPeriod = newPeriod;
        emit MinimumStakingPeriodUpdated(oldPeriod, newPeriod);
    }

    /**
     * @dev Update early unstake penalty (only owner)
     * @param newPenalty New penalty percentage (in basis points)
     */
    function setEarlyUnstakePenalty(uint256 newPenalty) external onlyOwner {
        require(newPenalty <= 2000, "Penalty too high"); // Max 20%
        uint256 oldPenalty = earlyUnstakePenalty;
        earlyUnstakePenalty = newPenalty;
        emit EarlyUnstakePenaltyUpdated(oldPenalty, newPenalty);
    }

    /**
     * @dev Deposit reward tokens to contract (only owner)
     * @param amount Amount of tokens to deposit
     */
    function depositRewards(uint256 amount) external onlyOwner {
        require(amount > 0, "Cannot deposit 0 tokens");
        ecoToken.safeTransferFrom(msg.sender, address(this), amount);
    }

    /**
     * @dev Withdraw excess tokens (only owner)
     * @param amount Amount to withdraw
     */
    function withdrawExcessTokens(uint256 amount) external onlyOwner {
        uint256 contractBalance = ecoToken.balanceOf(address(this));
        require(
            contractBalance >= totalStaked + amount,
            "Cannot withdraw staked tokens"
        );
        ecoToken.safeTransfer(msg.sender, amount);
    }

    /**
     * @dev Emergency withdraw for users (no rewards, with penalty)
     */
    function emergencyWithdraw() external nonReentrant {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No active stake");

        uint256 amount = userStake.amount;
        uint256 penalty = (amount * earlyUnstakePenalty) / REWARD_PRECISION;
        uint256 amountToReturn = amount - penalty;

        // Reset stake
        userStake.amount = 0;
        userStake.startTime = 0;
        userStake.lastClaimTime = 0;
        userStake.rewardsEarned = 0;

        totalStaked -= amount;

        ecoToken.safeTransfer(msg.sender, amountToReturn);

        emit EmergencyWithdraw(msg.sender, amountToReturn, block.timestamp);
    }

    /**
     * @dev Pause staking (only owner)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause staking (only owner)
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
