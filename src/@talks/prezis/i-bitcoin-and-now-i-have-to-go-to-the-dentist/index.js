'use client';
import {
  Deck,
  Slide,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Image,
  Appear,
  Quote,
} from 'spectacle';
import { DarkTheme } from '../../themes';
import { ThankYou } from '../../slides';

const Prezi = () => (
  <Deck transitionDuration={500} theme={DarkTheme} transition={['slide']}>
    <Slide>
      <Heading size={1} fit lineHeight={1} textColor={'secondary'}>
        I Bitcoin and Now I Have to Go to the Dentist
      </Heading>
    </Slide>
    <Slide>
      <Heading size={2}>Who are we?</Heading>
      <Text>James DiGioia - Front-End Developer</Text>
      <Text>Daryl Keeter - Front-End Developer</Text>
    </Slide>
    <Slide>
      <Heading size={3}>Disclosures</Heading>
      <Text>James - ~$100 in bitcoin currently</Text>
      <Text>Daryl - ~$850 in bitcoin currently</Text>
    </Slide>
    <Slide>
      <Heading size={3}>Agenda</Heading>
      <UnorderedList>
        <ListItem>What is the blockchain?</ListItem>
        <ListItem>What is bitcoin?</ListItem>
        <ListItem>Enthusiast perspective</ListItem>
        <ListItem>Skeptic perspective</ListItem>
      </UnorderedList>
    </Slide>
    <Slide>
      <Heading size={3}>What is the blockchain?</Heading>
      <UnorderedList>
        <ListItem>
          A public ledger{' '}
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>
                Records or transactional data (blocks)
              </ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
        <ListItem>
          Decentralized{' '}
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>
                No centralized control of the ledger
              </ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
        <ListItem>
          Distributed{' '}
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>No single point of failure</ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
      </UnorderedList>
    </Slide>
    <Slide>
      <Image src={require('./blockchain-build.png')} />
    </Slide>
    <Slide>
      <UnorderedList>
        <Image width={960} height={536} src={require('./network.gif')} />
      </UnorderedList>
    </Slide>
    <Slide>
      <Heading size={3}>What is blockchain used for?</Heading>
      <UnorderedList>
        <ListItem textSize={40}>
          Smart Contracts{' '}
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>Execute when conditions are met</ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
        <ListItem textSize={40}>
          Governance{' '}
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>Record voting and election data</ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
        <ListItem textSize={40}>
          Identity management{' '}
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>Identity and ownership</ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
        <ListItem textSize={40}>
          Peer-to-Peer digital payments
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>Bitcoin</ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
      </UnorderedList>
    </Slide>
    <Slide>
      <Heading size={3}>So....</Heading>
      <Appear>
        <Heading size={3}>what is bitcoin then?</Heading>
      </Appear>
    </Slide>
    <Slide>
      <Text>Blockchain is a distributed ledger</Text>
      <Text>Bitcoin is a currency built on top of this ledger</Text>
    </Slide>
    <Slide>
      <Text>Individuals have wallets on Bitcoin's blockchain</Text>
      <Text>
        This validates that a user controls a particular account on the ledger
      </Text>
      <Appear>
        <Text>Think private key vs public key</Text>
      </Appear>
      <Appear>
        <Text>Private key - wallet itself</Text>
      </Appear>
      <Appear>
        <Text>Public key - wallet address</Text>
      </Appear>
    </Slide>
    <Slide>
      <Text>When I want to send money to a wallet address,</Text>
      <Text>
        the software bundles that transaction with other transactions into a
        block.
      </Text>
      <Text>
        The network validates the block, cryptographically linking it to the
        previous block.
      </Text>
    </Slide>
    <Slide>
      <Heading size={4}>
        Every transaction has to be validated by the network
      </Heading>
    </Slide>
    <Slide>
      <Heading size={3}>So where does bitcoin come from?</Heading>
    </Slide>
    <Slide>
      <Image src={require('./miners.jpg')} />
    </Slide>
    <Slide>
      <UnorderedList>
        <ListItem>
          Miners are computers that compute the cryptographic link between
          blocks
        </ListItem>
        <Appear>
          <ListItem>Network validates that the result is correct</ListItem>
        </Appear>
        <Appear>
          <ListItem>
            Once network validates, block is added to the chain
          </ListItem>
        </Appear>
      </UnorderedList>
    </Slide>
    <Slide>
      <Heading size={4}>
        Miners are rewarded with a bitcoin for this computation
      </Heading>
    </Slide>
    <Slide>
      <Image src={require('./blockchain.jpg')} />
    </Slide>
    <Slide>
      <Text>
        The difficulty calculating this link is what limits the number of
        bitcoin
      </Text>
      <Text>
        The Bitcoin network has a hard cap on number of bitcoin that can be
        mined
      </Text>
      <Text>This scarcity is what gives them their value</Text>
    </Slide>
    <Slide>
      <Heading>Blockchain, the good</Heading>
    </Slide>
    <Slide>
      <UnorderedList>
        <ListItem>
          Immutable History
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>
                What goes in the blockchain, stays in the blockchain
              </ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
        <ListItem>
          Transparent History
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>
                Auditable. Anyone can view at any time
              </ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
        <ListItem>
          Secure
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>
                Cryptographically and architecturally
              </ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
        <Appear>
          <ListItem>It's only the beginning!</ListItem>
        </Appear>
      </UnorderedList>
    </Slide>
    <Slide>
      <Heading>Bitcoin, the good</Heading>
    </Slide>
    <Slide>
      <UnorderedList>
        <ListItem>
          Users are anonymous
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>
                No personal data needed for transfer. No taxes.
              </ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
        <ListItem>
          No third party involvement
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>
                No banks. Transactions/accounts can't be frozen.
              </ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
        <ListItem>Send/Receive worldwide</ListItem>
        <ListItem>
          Benefits for merchants
          <Appear>
            <UnorderedList>
              <ListItem textSize={32}>No reversals. No limits.</ListItem>
            </UnorderedList>
          </Appear>
        </ListItem>
      </UnorderedList>
    </Slide>
    <Slide>
      <Heading size={4} fill>
        The Skeptic Perspective
      </Heading>
      <Heading size={5} fit>
        Blockchain & Bitcoin is not a revolution
      </Heading>
    </Slide>
    <Slide>
      <Heading size={5} fill>
        Blockchain
      </Heading>
      <UnorderedList>
        <ListItem>
          Blockchain hasn't proven to be useful outside of "currency"
        </ListItem>
        <Appear>
          <ListItem>
            Computing new blocks on the Blockchain is expensive
          </ListItem>
        </Appear>
        <Appear>
          <ListItem>For many use cases, distributed isn't a feature</ListItem>
        </Appear>
      </UnorderedList>
    </Slide>
    <Slide>
      <Heading size={5} fill>
        Bitcoin
      </Heading>
      <UnorderedList>
        <ListItem>Bitcoin isn't a currency, it's a commodity</ListItem>
        <Appear>
          <ListItem>
            Bitcoin & cryptocurrencies are currently in a bubble
          </ListItem>
        </Appear>
        <Appear>
          <ListItem>A unregulated market is a bug, not a feature</ListItem>
        </Appear>
      </UnorderedList>
    </Slide>
    <Slide>
      <blockquote>
        <Quote textColor={'secondary'} textSize={30}>
          Bitcoin was supposed to demonstrate the power of a true free market...
          it's full of scams, rent-seekers, theft, useless for real purchases
          and accelerates climate change. Mission accomplished.
        </Quote>
        <cite>Adam Chalmers</cite>
      </blockquote>
    </Slide>
    <Slide>
      <Heading size={1} textSize={60}>
        Bitcoin is a technological solution to a political problem, and is
        emblematic of Silicon Valley's disinterst in doing the hard work of
        politics.
      </Heading>
    </Slide>
    {ThankYou()}
  </Deck>
);

export default Prezi;
