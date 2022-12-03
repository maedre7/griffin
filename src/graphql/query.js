import { gql } from 'graphql-request';

export const queryPoolTicks = gql`
  query queryPoolTicks($count: Int, $skip: Int, $poolAddress: Bytes){
    ticks(first: $count, skip: $skip, where: { poolAddress: $poolAddress }, orderBy: tickIdx) {
      tickIdx
      liquidityNet
      price0
      price1
    }
  }
`;

export const queryDailyVolume = gql`
  query queryDailyVolume($count: Int, $poolAddress: Bytes){
    poolDayDatas(skip: 1, first: $count, where:{pool: $poolAddress}, orderBy: date, orderDirection: desc) {
      volumeUSD
    }
  }
`;

export const queryCurrentState = gql`
  query queryCurrentState($poolAddress: Bytes){
    pool(id: $poolAddress) {
      id
      token0 {
        id
        symbol
        decimals
      }
      token1 {
        id
        symbol
        decimals
      }
      feeTier
      liquidity
      sqrtPrice
      tick
    }
  }
`;

export const queryUserPositions = gql`
  query queryUserPositions($user: Bytes){
      positions(first: 100, where: {owner: $user}){
        id
        owner
        liquidity
        pool {
          feeTier
        }
        token0 {
          symbol
          decimals
        }
        token1 {
          symbol
          decimals
        }
        tickLower {
          tickIdx
        }
        tickUpper {
          tickIdx
        }
        depositedToken0
        depositedToken1
      }
    }
`;