<template>
  <section id="settings--wallets">
    <div class="header">
      <h1 class="underlined">Wallets</h1>
    </div>
    <div class="body">
      <div class="left">
        <div :class="['wallet', {active: isActive(wallet)}]" v-for="(wallet, index) in $store.state.wallets" :key="index" @click="showLoginToWalletModal(wallet)">
          <div class="name">{{ wallet.label }}</div>
          <!-- <div class="value">{{ $formatMoney(444.444) }} {{ $store.state.currency }}</div> -->
        </div>
      </div>
      <div class="right">
        <div class="import-wallet" @click="showImportAWalletModal">
          <div class="import-wallet-btn">
            <p>Import a wallet</p>
          </div>
          <div class="btn-circle">
            <aph-icon name="plus"></aph-icon>
          </div>
        </div>
      </div>
    </div>
    <aph-login-to-wallet-modal v-if="$store.state.showLoginToWalletModal" :onCancel="hideLoginToWalletModal"></aph-login-to-wallet-modal>
    <aph-import-a-wallet-modal v-if="$store.state.showImportAWalletModal" :onCancel="hideImportAWalletModal"></aph-import-a-wallet-modal>
  </section>
</template>

<script>
import AphLoginToWalletModal from '../modals/LoginToWalletModal';
import AphImportAWalletModal from '../modals/ImportAWalletModal';

export default {
  components: {
    AphLoginToWalletModal,
    AphImportAWalletModal,
  },

  methods: {
    isActive({ label }) {
      return _.get(this.$store.state.currentWallet, 'label') === label;
    },

    showLoginToWalletModal(wallet) {
      this.$store.commit('setShowLoginToWalletModal', wallet);
    },
    hideLoginToWalletModal() {
      this.$store.commit('setShowLoginToWalletModal', null);
    },

    showImportAWalletModal() {
      this.$store.commit('setShowImportAWalletModal', true);
    },
    hideImportAWalletModal() {
      this.$store.commit('setShowImportAWalletModal', false);
    },
  },
};
</script>

<style lang="scss">
#settings--wallets {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .header {
    flex: none;
    padding: $space-lg;

    h1.underlined {
      @extend %underlined-header;

      flex: 1;
      margin-bottom: 0;
    }
  }

  .body {
    display: flex;
    flex: 1;
    overflow: hidden;

    .right {
      flex: none;
      margin-left: $space;

      .import-wallet {
        position: relative;

        .import-wallet-btn {
          @extend %btn-square;

          height: auto;
          padding: $space * 3 0;
          width: toRem(250px);

          .aph-icon {
            margin-bottom: $space;

            .fill {
              fill: $dark;
            }
          }

          &:hover {
            background: white;
            color: $purple;

            .aph-icon {
              .fill {
                fill: $dark;
              }
            }
          }
        }

        .btn-circle {
          @extend %btn-circle;

          margin-left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    .left {
      flex: 1;
      height: 100%;
      overflow: auto;
      padding-right: $space;

      .wallet {
        align-items: center;
        background: white;
        border-left: 3px solid transparent;
        border-radius: $border-radius;
        cursor: pointer;
        display: flex;
        padding: $space $space-lg;
        transition: $transition;

        .name {
          font-family: GilroySemibold;
          font-size: toRem(18px);
        }

        .value {
          @extend %small-uppercase-grey-label;

          margin-top: $space-sm;
        }

        &:hover, &.active {
          border-color: $purple;
        }

        & + .wallet {
          margin-top: $space;
        }
      }
    }
  }
}
</style>


