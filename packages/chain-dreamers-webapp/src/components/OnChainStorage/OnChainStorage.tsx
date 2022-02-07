import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import banner from "./banner.png";
import Content from "../Content/Content";
import { useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";

function OnChainStorage() {
  const isSmallWidth = useMediaQuery("(max-width:915px)");

  React.useEffect(() => {
    // @ts-ignore
    const twttr = window.twttr;

    if (twttr) {
      twttr.widgets.load();
    }
  }, []);

  return (
    <Box>
      <PageTitle label="On-Chain Storage" background={banner} />
      <Box
        sx={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
          padding: isSmallWidth ? "0 16px" : 0,
        }}
      >
        <Box sx={{ maxWidth: "895px" }}>
          <Content title="TL;DR">
            <ul>
              <li>
                On-chain storage feels right as it enables images to live as
                long as the underlying blockchain lives
              </li>
              <li>We pioneered bringing more complex images on-chain</li>
              <li>
                To do so, we switched from pixel-based to vector-based encoding
              </li>
              <li>
                We developed a custom encoding to efficiently store the traits
              </li>
              <li>
                We applied this innovation to a community we love: Chain Runners
              </li>
            </ul>
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                the michelin guide to “”on chain”” nfts
                <br />
                <br />❌<br />
                ipfs, arweave, or content hash
                <br />
                <br />
                ⭐️ <br />
                data stored via calldata
                <br />
                <br />
                ⭐️ ⭐️ <br />
                data stored via sstore. external script necessary to render data
                <br />
                <br />
                ⭐️⭐️⭐️
                <br />
                data stored via sstore. renderer built into contract. outputs
                svg or similar data uri
              </p>
              &mdash; dom (@dhof){" "}
              <a href="https://twitter.com/dhof/status/1410060181849919489?ref_src=twsrc%5Etfw">
                June 30, 2021
              </a>
            </blockquote>
          </Content>
          <Content title="The Chain Runners paradigm">
            <p>
              The story behind the Dreamers started in mid-Septembre when Jason
              and I started getting lost in the blockchain world: DeFi, dApps,
              NFT projects, protocols, WAGMI, wen moon, etc.
            </p>
            <p>
              From a technical point of view, everything was new and had to be
              learnt. On our way to the Dreamers, we definitely have to give a
              huge thanks to the eternal{" "}
              <Link href="https://cryptozombies.io/" target="_blank">
                Crypto Zombies
              </Link>{" "}
              from{" "}
              <Link href="https://twitter.com/loomnetwork" target="_blank">
                @loomnetwork
              </Link>
              , the cool guys of{" "}
              <Link href="https://twitter.com/_buildspace" target="_blank">
                @_buildspace
              </Link>
              , the
              <Link href="https://twitter.com/HardhatHQ" target="_blank">
                @HardhatHQ
              </Link>{" "}
              documentation,{" "}
              <Link href="https://twitter.com/wighawag" target="_blank">
                @wighawag
              </Link>{" "}
              from hardhat-deploy, the{" "}
              <Link href="https://twitter.com/dethcrypto" target="_blank">
                @dethcrypto team
              </Link>
              , and the{" "}
              <Link href="https://twitter.com/nounsdao" target="_blank">
                Nouns
              </Link>
              .
            </p>
            <blockquote className="twitter-tweet">
              <p lang="en" dir="ltr">
                web3 contracts and transactions being open source is a huge
                advantage in onboarding new developers. <br />
                <br />I learned Solidity by reading Nouns, Loot, and Punks
                contracts, not from books, tutorials, or expensive courses.
              </p>
              &mdash; threepwave (@threepwave){" "}
              <a href="https://twitter.com/threepwave/status/1464600483511689221?ref_src=twsrc%5Etfw">
                November 27, 2021
              </a>
            </blockquote>
            <p>
              Nounders brought us a sort of enlightenment on the philosophy of
              NFTs and technically speaking, on what it takes to start a
              collection. Their published repo truly helped us to start thinking
              about building on top of something. And then came the Runners.
            </p>
            <p>
              Runners were everything like the Nouns in terms of values and
              visons, but there was more. Whilst the Nouns are a forever
              evolving collection, the Runners are a forever evolving story,
              built and maintained by the community itself. Mega City is a
              framework for thinking, for creating, for dreaming, collectively.
            </p>
            <p>Below we go into the technical details of our work.</p>
          </Content>
          <Content title="Deep Dive into the Runners rendering contrat">
            <p>
              The Runners came to life with a very innovative rendering
              mechanism that has already been described elsewhere on the
              internet. But it came with a cost: approximately 75M gas (7-14 ETH
              at the time of writing depending on the gas price). This is
              unfortunate as this might prevent people from building Mega City,
              and eventually may cause the project to collapse.
            </p>
            <p>
              So we decided to experiment on gas saving with a dedicated
              repository: the{" "}
              <Link
                href="https://github.com/ClementWalter/light-runners"
                target="_blank"
              >
                Light Runners
              </Link>
              . By building on top of the Runners with the help of their
              community we were able to reduce by more than 3x the deployment
              cost of the original Runners, combining RLE encoding and
              concatenation of layer data in few{" "}
              <Link
                href="https://github.com/0xsequence/sstore2"
                target="_blank"
              >
                sstore2
              </Link>{" "}
              slots (kudos to{" "}
              <Link href="https://twitter.com/HypnoBrando" target="_blank">
                @hypnobrando
              </Link>
              ). But there was something else.
            </p>
          </Content>
          <Content title="The full vectorial approach">
            <p>
              Both the nouns and the runners use a pixel-based approach, meaning
              that they store a given amount of data proportional to the number
              of pixels in their image. However, these pixels are indeed fake
              pixels made of <code>&lt;rect /&gt;</code> svg tags. In other
              words, encoding a pixel is eventually storing a bit of information
              that will be given to the svg tag (actually the <code>fill=</code>{" "}
              field).
            </p>
            <p>
              What if we could fully leverage this and not only store{" "}
              <code>fill</code> but also <code>&lt;rect /&gt;</code> or{" "}
              <code>&lt;circle /&gt;</code> or, why not,{" "}
              <code>&lt;path /&gt;</code>?
            </p>
            <p>
              Actually, as per the{" "}
              <Link
                href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element"
                target="_blank"
              >
                documentation
              </Link>{" "}
              there are 66 different tags but amongst them
            </p>
            <blockquote>
              <p>
                the <code>&lt;path /&gt;</code> SVG element is the generic
                element to define a shape. All the basic shapes can be created
                with a path element.
              </p>
            </blockquote>
            <p>
              which means that it is possible to stick with this single option
              and encode only the <code>fill</code> and <code>d</code>{" "}
              attributes of each <code>&lt;path /&gt;</code>
            </p>
            <blockquote>
              <p>
                This attribute defines the shape of the path. <i>Value type</i>
                : <b>&lt;string&gt;</b> ; <i>Default value</i>: 
                <code>''</code>
              </p>
            </blockquote>
          </Content>
          <Content title="From the designer point of view">
            <p>
              Leaving the pixel world gives the designer a whole new world of
              possibilities for on-chain art. Actually, working as usual (e.g.
              on Illustrator) they only need to pay attention to:
            </p>
            <ul>
              <li>
                placing points on a grid with a fixed precision
                <ul>
                  <li>
                    because coordinates need to be encoded in a fixed format (
                    <code>uint8</code>, <code>uint16</code> etc) in the contract
                  </li>
                  <li>
                    note that this is not related to the final resolution but
                    only to the relative coordinate system of the image (defined
                    by the{" "}
                    <Link
                      href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox"
                      target="_blank"
                    >
                      viewBox
                    </Link>{" "}
                    main attribute){" "}
                  </li>
                </ul>
              </li>
              <li>
                minimizing the number of points used thanks to svg layering
                (only the front layer is visible)
                <ul>
                  <li>simplify parts that are not visible</li>
                  <li>create image as a stack of layers with the same color</li>
                </ul>
              </li>
              <li>the fact there is no transparency in svg</li>
              <li>
                exporting as svg converting every shape to{" "}
                <code>&lt;path /&gt;</code>
              </li>
            </ul>
          </Content>
          <Content title="From the engineering point of view">
            <p>
              Each <code>&lt;path /&gt;</code> is mainly described with two
              attributes:
            </p>
            <ul>
              <li>
                <code>d</code>: a string containing letters for path command and
                coordinates for the given command
              </li>
              <li>
                <code>fill</code>: the color as a hexadecimal 3 bytes string
              </li>
            </ul>
            <p>
              Each trait is then a concatenation of <code>&lt;path /&gt;</code>,
              and each Dreamer a concatenation of traits, hence still a
              concatenation of <code>&lt;path /&gt;</code>.
            </p>
            <p>Eventually the workflow is as follows:</p>
            <ul>
              <li>get all the traits as svg</li>
              <li>
                extract all the <code>&lt;path /&gt;</code>
              </li>
              <li>
                extract all the <code>fill</code>
              </li>
              <li>
                extract all the <code>d</code>
              </li>
              <li>
                create and store a global palette of colors for the dreamers
              </li>
              <li>
                create and store a global palette of <code>d</code> for the
                dreamers
              </li>
              <li>
                rewrite all the traits as a list of{" "}
                <code>(d_index, fill_index)</code>
              </li>
              <li>store this mapping</li>
            </ul>
            <p>
              Then, retrieving a Dreamer is mainly stacking the{" "}
              <code>&lt;path /&gt;</code> recomputed from the full list of
              (d_index, fill_index).
            </p>
          </Content>
          <Content title="Storage optimization">
            <h2>Encoding</h2>
            <p>
              Each <code>d</code> attribute is a sequence of a command letter
              followed by its corresponding parameters. Each letter has a
              different number of parameters. Each coordinate has a value within
              the range defined in the <code>viewBox</code> global attributes.
            </p>
            <p>We made the following decisions:</p>
            <ul>
              <li>
                keep only absolute parameters. This leads to a total of 8
                letters (<code>M</code>, <code>L</code>, <code>Q</code>,{" "}
                <code>C</code>, <code>H</code>, <code>V</code>, <code>A</code>,{" "}
                <code>Z</code>) and consequently 3 bits to store a letter
              </li>
              <li>
                store the number of parameters per letters in a constant
                <code>bytes</code>: <code>hex"0202040607010100"</code>
              </li>
              <li>
                define the <code>viewBox="0 0 255 255"</code> so that each
                coordinate can fit in a <code>byte1</code> (<code>uint8</code>)
              </li>
            </ul>
            <p>
              Eventually, a given <code>d</code> is encoded at a bit level and
              decoding works as follows:
            </p>
            <ul>
              <li>read the first three bits</li>
              <li>
                retrieve the corresponding letter and number of parameters
              </li>
              <li>
                read <i>numberOfParameters</i> times 8 bits
              </li>
              <li>
                start over until reaching the end of <code>bytes</code>
              </li>
            </ul>
            <p>
              Each <code>fillIndex</code> is stored as a <code>uint16</code> and
              the color is retrieved from the global palette.
            </p>
            <h2>Storage</h2>
            <p>
              We used the{" "}
              <Link
                href="https://github.com/0xsequence/sstore2"
                target="_blank"
              >
                SSTORE2
              </Link>{" "}
              library for optimizing the storage cost of the Dreamers. After
              benchmarking the lib for the Light Runners, we concluded that it
              is cheaper to store one long <code>bytes</code> of 24kb instead of
              several small ones.
            </p>
            <p>
              This observation leads to concatenating every encoded{" "}
              <code>d</code> up to the contract size limit, and add another{" "}
              <code>dIndexes</code> <code>bytes</code> to look up the
              corresponding bytes from the storage for a given d.
            </p>
            <p>
              Since each trait has a random number of{" "}
              <code>&lt;path /&gt;</code> we also used a{" "}
              <code>traitIndexes</code> to look up the corresponding bytes for a
              given trait.{" "}
            </p>
          </Content>
          <Content title="On-chain rendering">
            <h2>Rendering the Dreamer</h2>
            <p>
              Though the rendering of a Dreamer has been implemented and tested
              on-chain (see the <code>DreamersRenderer.imageURI</code>{" "}
              function), we didn't use this function in the actual token
              following the current latest Chain Runner's implementation. Indeed
              to be compliant with, for instance, the new twitter feature for
              NFTs PFP, they as well as we, needed to return <code>.png</code>{" "}
              images. Hence we opened an API to compute the rendering off-chain
              and point to this API in the token metadata. This leads to few
              comments:
              <ul>
                <li>
                  though the rendering is actually off-chain, this doesn't mean
                  in any sense that the project is not 100% on-chain because the
                  chain embeds everything required to generate a Dreamer;
                </li>
                <li>
                  it is actually possible to call the rendering function from
                  etherscan and see the corresponding SVG;
                </li>
                <li>
                  we however think that this tradeoff between storage and
                  computation is definitely meaningful in the context of the
                  blockchain. The ultimate goal of the blockchain is to
                  permanently store and allow for the retrieval of data, not
                  necessarily to recompute everything, everytime. In this
                  context even a working rendering function has its output
                  cached by, e.g. OpenSea.
                </li>
              </ul>
            </p>
          </Content>
          <Content title="Conclusion">
            <p>
              Chain Dreamers is another attempt at bringing more creativity to
              the chain, we hope that you like it! We are only getting starting
              with the{" "}
              <Link href="https://thecandyshop.wtf" target="_blank">
                Candy Shop
              </Link>
              , our innovative lab. With each new candy we will strive to push
              forward the limits of the chain. <i>Break the chain</i>.
            </p>
          </Content>
        </Box>
      </Box>
    </Box>
  );
}

export default OnChainStorage;
