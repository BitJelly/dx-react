import React from 'react'

import { storiesOf } from '@storybook/react'
import { array, object, boolean, text } from '@storybook/addon-knobs'
import { action, decorateAction } from '@storybook/addon-actions'

import TokenOverlay from 'components/TokenOverlay'
import { TokenMod, TokenCode, TokenPair } from 'types'

import { generateTokenBalances, CenterDecorator } from './helpers'

const tokenBalances = generateTokenBalances()

const getCodeFromArgs = decorateAction([
  args => [args[0].code],
])

storiesOf('TokenOverlay', module)
  .addDecorator(CenterDecorator)
  .addWithJSX('open', () => {
    const approvedTokens = new Set(array('approvedTokens', ['ETH', 'GNO'])) as Set<TokenCode>
    return (
      <TokenOverlay
        closeOverlay={action('CLOSE OVERLAY')}
        selectTokenPairAndRatioPair={getCodeFromArgs('CLOSE OVERLAY AND SELECT')}
        resetTokenPairAndCloseOverlay={() => {}}
        resettable={boolean('resettable', true)}
        tokenList={array('tokenCodeList', [])}
        tokenBalances={object('tokenBalances', tokenBalances)}
        open={boolean('open', true)}
        mod={text('mod', 'sell') as TokenMod}
        approvedTokens={approvedTokens}
        availableAuctions={new Set()}
        WETHAddress=""
        tokenPair={{} as TokenPair}
     />
    )
  })
