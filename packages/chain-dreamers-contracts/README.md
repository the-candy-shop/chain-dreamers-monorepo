# Chain Dreamers Contracts

This package contains all the contracts for the Chain Dreamers project. They are split in:

- dreamers: the Dreamers contract
    - CandyShop: the contract for the ERC1155 Candy Shop
    - ChainDreamers: the contract for the ERC721Enumerable ChainDreamers token
    - DreamersRenderer: the contract containing the rendering logic for the on-chain artwork
    - ChainRunnersConstants: a contract containing some Chain Runners' constants that were not `public` though required
- interfaces: the interfaces that the project implements

## Run Length Encoding

The Run Length Encoding is a simple compression algorithm. It is used to reduce the size of the data by storing the
number of repetitions of the same value. For more info, see
Wikipedia: [https://en.wikipedia.org/wiki/Run-length_encoding](https://en.wikipedia.org/wiki/Run-length_encoding)

Achieved reduction got by running the light-runners task:

```
Original bytes count: 136864
Light bytes count: 54432
Ratio: 40%
Average light bytes length: 165 VS 416
Max light bytes length: 770 VS 416
```
