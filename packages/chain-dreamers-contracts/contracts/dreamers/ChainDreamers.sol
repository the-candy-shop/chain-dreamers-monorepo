// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "./IDreamersRenderer.sol";

contract ChainDreamers is ERC721Enumerable, Ownable, ReentrancyGuard {
    // Data structures
    struct ChainDreamer {
        uint184 dna;
    }
    mapping(address => uint256) public dreamersMintedCounts;
    mapping(uint256 => ChainDreamer) public dreamers;

    // Linked contracts
    address public renderingContractAddress;
    address public chainRunnersAddress;
    address public candyShopAddress;
    ERC721Enumerable chainRunners;
    IERC1155 candyShop;
    IDreamersRenderer renderer;

    // Constants
    uint256 private constant MAX_DREAMERS = 10_000;

    // State variables
    uint256 public publicSaleStartTimestamp;
    uint256 public runnerAccessStartTimestamp;

    function setPublicSaleTimestamp(uint256 timestamp) external onlyOwner {
        publicSaleStartTimestamp = timestamp;
    }

    function setRunnerAccessTimestamp(uint256 timestamp) external onlyOwner {
        runnerAccessStartTimestamp = timestamp;
    }

    function isPublicSaleOpen() public view returns (bool) {
        return
            block.timestamp >= publicSaleStartTimestamp &&
            publicSaleStartTimestamp != 0;
    }

    function isRunnerAccessOpen() public view returns (bool) {
        return
            !isPublicSaleOpen() &&
            block.timestamp >= runnerAccessStartTimestamp &&
            runnerAccessStartTimestamp != 0;
    }

    modifier whenRunnersAccessActive() {
        require(isRunnerAccessOpen(), "Runners only access not open");
        _;
    }
    modifier whenPublicSaleActive() {
        require(isPublicSaleOpen(), "Public sale not open");
        _;
    }

    function setRenderingContractAddress(address _renderingContractAddress)
        public
        onlyOwner
    {
        renderingContractAddress = _renderingContractAddress;
        renderer = IDreamersRenderer(renderingContractAddress);
    }

    function setChainRunnersContractAddress(
        address _chainRunnersContractAddress
    ) public onlyOwner {
        chainRunnersAddress = _chainRunnersContractAddress;
        chainRunners = ERC721Enumerable(chainRunnersAddress);
    }

    function setCandyShopContractAddress(address _candyShopContractAddress)
        public
        onlyOwner
    {
        candyShopAddress = _candyShopContractAddress;
        candyShop = IERC1155(candyShopAddress);
    }

    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {}

    function mint(uint256 tokenId) public {
        _safeMint(_msgSender(), tokenId);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (renderingContractAddress == address(0)) {
            return "";
        }

        return
            string(
                abi.encodePacked(
                    'data:application/json,{"image_uri":data:image/svg+xml;utf-8',
                    renderer.getSvg(_tokenId),
                    "}"
                )
            );
    }

    receive() external payable {}

    function withdraw() public onlyOwner {
        (bool success, ) = _msgSender().call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}
