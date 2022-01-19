// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CandyShop is ERC1155, Ownable, ReentrancyGuard {
    struct SKU {
        uint256 id;
        uint256 price;
        uint256 supply;
        uint256 circulating;
        string name;
    }
    struct SKUInput {
        uint256 price;
        uint256 supply;
        string name;
    }
    mapping(uint256 => SKU) public inventory;
    mapping(string => uint256) public skuIds;

    bytes32[] names;

    function addSku(SKUInput[] memory _skus) external onlyOwner {
        for (uint256 i = 0; i < _skus.length; i++) {
            if (names.length > 0) {
                require(
                    names[skuIds[_skus[i].name]] !=
                        keccak256(bytes(_skus[i].name)),
                    "Sku already exists"
                );
            }
            uint256 tokenId = names.length;
            skuIds[_skus[i].name] = tokenId;
            names.push(keccak256(bytes(_skus[i].name)));
            inventory[tokenId] = SKU(
                tokenId,
                _skus[i].price,
                _skus[i].supply,
                0,
                _skus[i].name
            );
        }
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked('{"name": "', inventory[_tokenId].name, '"}')
            );
    }

    modifier inventoryExists() {
        require(names.length > 0, "The candy shop is empty");
        _;
    }

    modifier skuExists(string calldata skuName) {
        require(
            names[skuIds[skuName]] == keccak256(bytes(skuName)),
            "This candy does not exist yet"
        );
        _;
    }
    modifier skuExist(string[] calldata skuNames) {
        for (uint256 i = 0; i < skuNames.length; i++) {
            require(
                names[skuIds[skuNames[i]]] == keccak256(bytes(skuNames[i])),
                "This candy does not exist yet"
            );
        }
        _;
    }

    function enoughSupply(string calldata tokenName, uint256 amount)
        internal
        view
        skuExists(tokenName)
        returns (bool)
    {
        if (inventory[skuIds[tokenName]].supply == 0) {
            return true;
        }
        return
            inventory[skuIds[tokenName]].circulating + amount <=
            inventory[skuIds[tokenName]].supply;
    }

    function rightValue(string calldata tokenName, uint256 amount)
        internal
        view
        skuExists(tokenName)
        returns (bool)
    {
        return msg.value == inventory[skuIds[tokenName]].price * amount;
    }

    function mint(string calldata tokenName, uint256 amount)
        external
        payable
        nonReentrant
        inventoryExists
        skuExists(tokenName)
    {
        require(enoughSupply(tokenName, amount), "Not enough supply");
        require(
            rightValue(tokenName, amount),
            "You have to pay the price to eat candies"
        );

        _mint(_msgSender(), skuIds[tokenName], amount, "");

        inventory[skuIds[tokenName]].circulating += amount;
    }

    function mintBatch(string[] calldata tokenNames, uint256[] calldata amounts)
        external
        payable
        nonReentrant
        inventoryExists
        skuExist(tokenNames)
    {
        uint256 price;
        uint256[] memory tokenIds = new uint256[](tokenNames.length);
        for (uint256 i = 0; i < tokenNames.length; i++) {
            require(
                enoughSupply(tokenNames[i], amounts[i]),
                "Not enough supply"
            );
            price += inventory[skuIds[tokenNames[i]]].price * amounts[i];
            tokenIds[i] = skuIds[tokenNames[i]];
        }

        require(msg.value == price, "You have to pay the price to eat candies");

        _mintBatch(_msgSender(), tokenIds, amounts, "");

        for (uint256 i = 0; i < tokenNames.length; i++) {
            inventory[tokenIds[i]].circulating += amounts[i];
        }
    }

    function burn(string calldata tokenName, uint256 amount)
        external
        nonReentrant
        inventoryExists
        skuExists(tokenName)
    {
        _burn(_msgSender(), skuIds[tokenName], amount);
        inventory[skuIds[tokenName]].circulating -= amount;
    }

    function burnBatch(string[] calldata tokenNames, uint256[] calldata amounts)
        external
        nonReentrant
        inventoryExists
        skuExist(tokenNames)
    {
        uint256[] memory tokenIds = new uint256[](tokenNames.length);
        for (uint256 i = 0; i < tokenNames.length; i++) {
            tokenIds[i] = skuIds[tokenNames[i]];
        }
        _burnBatch(_msgSender(), tokenIds, amounts);
        for (uint256 i = 0; i < tokenNames.length; i++) {
            inventory[tokenIds[i]].circulating -= amounts[i];
        }
    }

    constructor(string memory uri_) ERC1155(uri_) {}

    receive() external payable {}

    function withdraw() public onlyOwner {
        (bool success, ) = _msgSender().call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}
