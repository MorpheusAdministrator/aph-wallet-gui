<template>
  <modal-wrapper id="aph-add-token-modal" identifier="addToken">
    <div class="body">
      <aph-icon name="create"></aph-icon>
      <aph-input placeholder="Script Hash or Token Symbol" :light="true" v-model="hashOrSymbol"></aph-input>
    </div>
    <div class="footer">
      <button class="cancel-btn" @click="onCancel">Cancel</button>
      <button class="add-btn" @click="add" :disabled="shouldDisableAddButton">Add</button>
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from './ModalWrapper';

export default {
  components: {
    ModalWrapper,
  },

  computed: {
    shouldDisableAddButton() {
      return !this.hashOrSymbol.length || this.$isPending('addToken');
    },
  },

  data() {
    return {
      hashOrSymbol: '',
    };
  },

  methods: {
    add() {
      this.$store.dispatch('addToken', {
        hashOrSymbol: this.hashOrSymbol,
        done: () => {
          this.onCancel();
        },
      });
    },
  },

  props: {
    onCancel: {
      required: true,
      type: Function,
    },
  },
};
</script>


<style lang="scss">
#aph-add-token-modal {
  align-items: center;
  background: rgba($dark, 0.8);
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;

  .body {
    padding: $space-lg;
    text-align: center;

    .aph-icon {
      margin-bottom: $space-lg;

      svg {
        height: $space-xl;
      }
    }

    .aph-input {
      border-color: $dark;

      &.focused {
        border-color: $purple;
      }

      input {
        color: $dark;
      }

      .placeholder {
        color: $grey;
        font-family: GilroyMedium;
      }

      & + .aph-input {
        margin-top: $space;
      }
    }
  }

  .footer {
    display: flex;

    > * {
      flex: 1;
    }
  }

  .cancel-btn {
    @extend %btn-footer-light;

    border-bottom-left-radius: $border-radius;
  }

  .add-btn {
    @extend %btn-footer;

    border-bottom-right-radius: $border-radius;
  }
}
</style>
