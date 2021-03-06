<template>
  <section id="dashboard--holdings">
    <div class="header">
      <h1 class="underlined">My holdings</h1>
    </div>
    <div class="body">
      <div v-for="(holding, index) in holdings" :class="['holding', {active: isActive(holding)}]" :key="index" @click="viewHoldingDetail(holding)">
        <aph-token-icon :symbol="holding.symbol"></aph-token-icon>
        <div class="token">
          <div class="name">{{ holding.name }}</div>
          <div class="currency">{{ holding.symbol }}</div>
        </div>
        <div class="balance">
          <div class="amount">
            {{ $formatNumber(holding.balance) }}<span class="currency">{{ holding.symbol }}</span>
          </div>
          <div :class="['change', {decrease: holding.change24hrPercent < 0, increase: holding.change24hrPercent > 0}]">{{ $formatNumber(holding.change24hrPercent) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
let loadHoldingsIntervalId;
export default {
  computed: {
    holdings() {
      return this.$store.state.holdings.filter(({ name, symbol }) => {
        return !!name && !!symbol;
      });
    },
  },

  methods: {
    isActive({ symbol }) {
      return _.get(this.$store.state.statsToken, 'symbol') === symbol;
    },

    loadHoldings() {
      this.$store.dispatch('fetchHoldings');
    },

    viewHoldingDetail(holding) {
      this.$router.replace('/authenticated/dashboard');
      this.$store.commit('setStatsToken', holding);
    },
  },

  mounted() {
    this.loadHoldings();

    loadHoldingsIntervalId = setInterval(() => {
      this.loadHoldings();
    }, this.$constants.intervals.POLLING);
  },

  beforeDestroy() {
    clearInterval(loadHoldingsIntervalId);
  },
};
</script>

<style lang="scss">
#dashboard--holdings {
  display: flex;
  flex-direction: column;

  .header {
    padding: $space-lg;

    h1.underlined {
      @extend %underlined-header;

      flex: 1;
      margin-bottom: 0;
    }
  }

  .body {
    overflow: auto;
    padding-right: $space;

    .holding {
      align-items: center;
      background: white;
      border-left: 3px solid transparent;
      border-radius: $border-radius;
      cursor: pointer;
      display: flex;
      padding: $space;
      transition: $transition;

      .aph-token-icon {
        flex: none;
        padding-right: $space;
      }

      .token {
        flex: 1;

        .name {
          font-family: GilroySemibold;
          font-size: toRem(19px);
          margin-bottom: $space-sm;
        }

        .currency {
          @extend %small-uppercase-grey-label;

          font-size: toRem(15px);
        }
      }

      .balance {
        flex: 1;
        font-family: GilroyMedium;
        text-align: right;

        .amount {
          margin-bottom: $space-sm;
          font-size: toRem(19px);

          .currency {
            margin-left: $space-xsm;
          }
        }

        .change {
          font-size: toRem(15px);

          &.increase {
            color: $green;

            &:before {
              content: "+";
            }

            &:after {
              content: "%";
              margin-left: $space-xsm;
            }
          }

          &.decrease {
            color: $red;
          }

          &:after {
            content: "%";
            margin-left: $space-xsm;
          }
        }
      }

      &:hover, &.active {
        border-color: $purple;
      }

      & + .holding {
        margin-top: $space;
      }
    }
  }
}
</style>

