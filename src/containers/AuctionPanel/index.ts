import { connect } from 'react-redux'
import AuctionPanel from 'components/AuctionPanel'
import { State } from 'types'
import AuctionStateHOC from 'components/AuctionStateHOC'
import { createSelector } from 'reselect'

const makeSets = createSelector(
  ({ tokenList }) => tokenList.type !== 'DEFAULT' ? tokenList.combinedTokenList : tokenList.defaultTokenList,
  tokenList => {
    const address2Token = {}
    const symbol2Token = {}

    for (const token of tokenList) {
      const { address, symbol } = token
      if (address) address2Token[address] = token
      if (symbol) symbol2Token[symbol] = token
    }
    return { address2Token, symbol2Token }
  },
)

const mapStateToProps = (state: State) => ({
  tokenList: state.tokenList.type !== 'DEFAULT' ? state.tokenList.combinedTokenList : state.tokenList.defaultTokenList,
  ...makeSets(state),
})


export default connect(mapStateToProps)(AuctionStateHOC(AuctionPanel))
