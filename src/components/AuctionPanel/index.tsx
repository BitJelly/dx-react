import React from 'react'

import AuctionContainer from 'components/AuctionContainer'
import AuctionFooter from 'components/AuctionFooter'
import AuctionHeader from 'components/AuctionHeader'
import AuctionProgress from 'components/AuctionProgress'
import AuctionStatus from 'components/AuctionStatus'

import Loader from 'components/Loader'

import { AuctionStateState, AuctionStateProps } from 'components/AuctionStateHOC'

type AuctionPanelProps = AuctionStateState & AuctionStateProps & {
  claimSellerFunds: () => any,
}

// const status2progress = {
//   [Status.INIT]: 1,
//   [Status.PLANNED]: 2,
//   [Status.ACTIVE]: 3,
//   [Status.ENDED]: 4,
// }

// const getAuctionProgress = (status: Status) => status2progress[status] || 0

const AuctionPanel: React.SFC<AuctionPanelProps> = ({
  match: { url },
  sell, buy,
  status, completed, timeToCompletion,
  userSelling, userGetting, userCanClaim,
  progress,
  error,
  claimSellerFunds,
}) => (
  <AuctionContainer auctionDataScreen="status">
    <AuctionHeader backTo="/wallet">
      Auction URL: <a href="">
        {typeof window !== 'undefined' ? window.location.toString() : `https://www.dutchx.pm${url}/`}
      </a>
    </AuctionHeader>
    <Loader
      hasData={sell}
      message={error || 'Auction has not started. Please try a lower auction index'}
      render={() =>
        <>
          <AuctionStatus
            sellToken={sell}
            buyToken={buy}
            buyAmount={userCanClaim}
            timeLeft={timeToCompletion}
            status={status}
            completed={completed}
            claimSellerFunds={claimSellerFunds}
          />
          <AuctionProgress progress={progress} />
          <AuctionFooter
            sellTokenSymbol={sell.symbol || sell.name || sell.address}
            buyTokenSymbol={buy.symbol || buy.name || buy.address}
            sellAmount={userSelling}
            buyAmount={userGetting}
            sellDecimal={sell.decimals}
            buyDecimal={buy.decimals}
            auctionEnded={completed}
          />
        </>
      } />
  </AuctionContainer>
)

export default AuctionPanel
