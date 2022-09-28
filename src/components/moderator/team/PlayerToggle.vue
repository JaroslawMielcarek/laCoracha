<template>
  <div class="player_toggle">
    <input class='player_checkbox' type='checkbox' :id='this.id' :checked="onList"/>
    <label class='label' @click="this.$emit('togglePlayer', this.id)">
      <p class='player_name'>{{nick}}</p>
      <p class='player_id'>{{memberID}}</p>
    </label>
  </div>
</template>

<script>
export default {
  name: 'PlayerToggle',
  emits: ['togglePlayer'],
  props: {
    player: Object,
    onList: Boolean
  },
  computed: {
    id(){ return this.player._id},
    nick(){ return this.player.nick.value || ''},
    memberID(){ return this.player.memberID }
  }
}
</script>
<style lang="scss" scoped>
@import '@/colors.scss';
.player_toggle {
  display: flex;
  flex-direction: column;
}
.player_checkbox {
  display: none;
  &:checked + .label {
    background-color: rgba($blueDark, .4);
    border: none;
    color: $white;
    &:hover{
        border: 1px dashed $white;
        color: rgba($blueDark, .8);
    }
  }
}
.label {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background-color: $white;
  border: 1px solid rgba($blueDark, .4);
  border-radius: 50%;
  margin: 5px 10px;
  cursor: pointer;
  &:hover{
      border: 1px dashed rgba($blueDark, .2);
      color: rgba($blueDark, .4)
  }
  .player_name,
  .player_id {
    margin-bottom: .1em;
  }
  .player_id {
    font-weight: 300;
  }
}
</style>
