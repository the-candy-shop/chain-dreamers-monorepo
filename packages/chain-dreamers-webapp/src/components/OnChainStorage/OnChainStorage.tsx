import React from "react";
import Box from "@mui/material/Box";
import PageTitle from "../PageTitle/PageTitle";
import banner from "./banner.png";
import Content from "../Content/Content";
import { useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";

function OnChainStorage() {
  const isMobile = useMediaQuery("(max-width:915px)");

  return (
    <Box>
      <PageTitle label="On-Chain Storage" background={banner} />
      <Box
        sx={{
          marginTop: "96px",
          display: "flex",
          justifyContent: "center",
          padding: isMobile ? "0 16px" : 0,
        }}
      >
        <Box sx={{ maxWidth: "895px" }}>
          <Content title="TL;DR">
            <ul>
              <li>On-chain storage is the holy graal of NFTs project</li>
              <li>
                We pioneered to bring more complex images on-chain by leveraging
                on a community we love: Chain Runners
              </li>
              <li>
                To do so, we switched from pixel-based to vector-based encoding
              </li>
              <li>
                We develop a custom encoding to store efficiently the traits
              </li>
            </ul>
          </Content>
          <Content title="The Chain Runners paradigm">
            <p>
              The story behind the Dreamers starts in mid-septembre when Jason
              and I started to get lost into the blockchain world: DeFi, dApps,
              NFT projets, protocols, WAGMI, wen moon, etc.
            </p>
            <p>
              From a technical point of view, everything was new and to be
              learnt. On our way to the Dreamers we definitely have to give a
              huge thank to the eternal{" "}
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
              ,{" "}
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
            <p>
              Nounders brought to us sort of an enlightenment both in terms of
              the philosophy behind NFTs and in terms of what it means,
              technically speaking, to start a collection. Publishing their repo
              truly helped us start thinking about building on top of something.
              And then came the Runners.
            </p>
            <p>
              Runners were everything about the nouns in terms of values and
              visons, but there were more. Like the Nouns are a forever evolving
              collection, the Runners are a forever evolving story built and
              maintained by the community itself. Mega City is a framework to
              think, the create, to dream, collectively.
            </p>
            <p>
              Next we go into the details of the technical aspects of your work.
            </p>
          </Content>
          <Content title="Deep Dive into the Runners rendering contrat">
            <p>
              The Runners came to life with a very innovative rendering
              mechanism that has already been described elsewhere on the
              internet. But it came with a cost: approximately 75M gas (7-14 ETH
              at the time of writing depending on gas price). This is
              unfortunate as this could prevent people from building Mega City,
              and eventually could cause the project to collapse.
            </p>
            <p>
              So I decided to experiment on gas saving with a dedicated
              repository: the{" "}
              <Link
                href="https://github.com/ClementWalter/light-runners"
                target="_blank"
              >
                Light Runners
              </Link>
              . Building on top of the Runners with the community (kudos to{" "}
              <Link href="https://twitter.com/HypnoBrando" target="_blank">
                @hypnobrando
              </Link>{" "}
              for{" "}
              <Link
                href="https://github.com/0xsequence/sstore2"
                target="_blank"
              >
                SSTORE2
              </Link>
              ) made it possible to reduce by more than 3x the deployment cost
              of the runners, combining RLE encoding and concatenation of layers
              data in few SSTORE2 slots. But there were something else.
            </p>
          </Content>
          <Content title="The full vectorial approach">
            <p>
              Both the nouns and the runners use a pixel-wise approach, meaning
              that they store a given amount of data proportional to the number
              of pixels of their image. However, these pixels are indeed *fake*
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
                place points on a grid with a fixed precision
                <ul>
                  <li>
                    because coordinates need to be encoded in a fixed format
                    size (<code>uint8</code>, <code>uint16</code> etc) in the
                    contract
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
                minimize the number of points used thanks to svg layering (only
                the front layer is visible)
                <ul>
                  <li>simplify parts that are not visible</li>
                  <li>create image as a stack of layers with the same color</li>
                </ul>
              </li>
              <li>beware of no transparency in svg</li>
              <li>
                export as svg converting every shape to{" "}
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
                <code>d</code> : a string containing letters for path command
                and coordinates for the given command
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
              <li>extract all the d</li>
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
              different number of parameters. Each coordinates has a value
              within the range defined in the <code>viewBox</code> global
              attributes.
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
              Each fill index is stored as a <code>uint16</code> and the color
              is retrieved from the global palette.
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
          <Content title="Conclusion">
            <p>
              Chain Dreamers is another attempt at bringing more creativity to
              the chain, we hope that you liked it! We are just getting starting
              with the Candy Shop, our innovative labs. With each new drug we
              will strive to push forwards the limits of the chain,{" "}
              <i>Break the chain</i>.
            </p>
          </Content>
        </Box>
      </Box>
    </Box>
  );
}

export default OnChainStorage;
