<template>
  <div class="teams-list">
    <div class="teams-list__header">
      <div class="teams-list__header-title">
        <h1>Teams manager</h1>
      </div>
      <div class="teams-list__header-subtitle">
        by Nikita Nikonorov
      </div>
    </div>
    <div class="teams-list__content">
      <div v-for="team in teams" v-bind:key="team.key" class="team" :data-id="team.id">
        <div class="team__header" v-on:click="handleOpenItem(team.id, $event)"
             v-bind:class="{ editing: isItemEditing('team', team.id) }">
          <div class="team__header-icon">
            <IconArrow/>
          </div>
          <div class="team__header-title">
            <input v-if="isItemEditing('team', team.id)" type="text" :value="team.name" placeholder="Team">
            <input v-else type="text" :value="team.name" placeholder="Team" readonly>
          </div>
          <div class="team__header-actions">
            <div class="actions">
              <div class="actions__item actions__item--done" v-on:click="updateItem('team', $event, team.id)">
                <IconDone/>
              </div>
              <div class="actions__item actions__item--cancel" v-on:click="setEditDisable()">
                <IconCancel/>
              </div>
              <div class="actions__item actions__item--edit" v-on:click="setEditEnable('team', team.id)">
                <IconEdit/>
              </div>
              <div class="actions__item actions__item--delete"
                   v-on:click="deleteTeam( team.id)">
                <IconTrash/>
              </div>
            </div>
          </div>
        </div>
        <div class="team__more">
          <div class="team__more-inner">
            <div v-if="team.roster" class="team__roster">
              <div v-for="player in team.roster" v-bind:key="player.key" class="team__player"
                   v-bind:class="{ editing: isItemEditing('player', team.id, player.id) }" :data-id="player.id">
                <div class="team__player-info">
                  <div class="team__player-name">
                    <input v-if="isItemEditing('player', team.id, player.id)" type="text" :value="player.name"
                           placeholder="Name">
                    <input v-else type="text" :value="player.name" placeholder="Name" readonly>
                  </div>
                  <div class="team__player-position">
                    <input v-if="isItemEditing('player', team.id, player.id)" type="text" :value="player.position"
                           placeholder="Pos.">
                    <input v-else type="text" :value="player.position" placeholder="Pos." readonly>
                  </div>
                  <div class="team__player-age">
                    <input v-if="isItemEditing('player', team.id, player.id)" type="text" :value="player.age"
                           placeholder="Age">
                    <input v-else type="text" :value="player.age" placeholder="Age" readonly>
                  </div>
                </div>
                <div class="team__player-actions">
                  <div class="actions">
                    <div class="actions__item actions__item--done"
                         v-on:click="updateItem('player', $event, team.id, player.id)">
                      <IconDone/>
                    </div>
                    <div class="actions__item actions__item--cancel" v-on:click="setEditDisable()">
                      <IconCancel/>
                    </div>
                    <div class="actions__item actions__item--edit"
                         v-on:click="setEditEnable('player', team.id, player.id)">
                      <IconEdit/>
                    </div>
                    <div class="actions__item actions__item--delete" v-on:click="deletePlayer(player.id,team.id)">
                      <IconTrash/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="add add--player">
                <div class="add__content">
                  <div class="add__field add__field--name">
                    <input type="text" placeholder="Name">
                  </div>
                  <div class="add__field add__field--position">
                    <input type="text" placeholder="Pos.">
                  </div>
                  <div class="add__field add__field--age">
                    <input type="text" placeholder="Age">
                  </div>
                </div>
                <div class="add__actions">
                  <div class="actions">
                    <div class="actions__item actions__item--plus" v-on:click="addPlayer($event, team.id)">
                      <IconPlus/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="add add--team">
        <div class="add__field">
          <input type="text" placeholder="Add team">
        </div>
        <div class="add__actions">
          <div class="actions">
            <div class="actions__item actions__item--plus" v-on:click="addTeam($event)">
              <IconPlus/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconArrow from "@/components/icons/IconArrow";
import IconDone from "@/components/icons/IconDone";
import IconCancel from "@/components/icons/IconCancel";
import IconEdit from "@/components/icons/IconEdit";
import IconTrash from "@/components/icons/IconTrash";
import IconPlus from "@/components/icons/IconPlus";

export default {
  name: 'TeamsList',
  components: {
    IconArrow,
    IconDone,
    IconCancel,
    IconEdit,
    IconTrash,
    IconPlus,
  },
  props: {
    teams: Array,
    activeTeamId: [Number, Boolean],
    editingTeamId: [Number, Boolean],
    editingPlayerId: [Object, Boolean],
  },
  computed: {},
  methods: {
    handleOpenItem: function (id, event) {
      if (!event.target.classList.contains('actions__item') && id !== this.editingTeamId) {
        this.$emit('openItem', id);
      }
    },
    openActiveItem: function (id) {
      // логика открытия/закрытия коллапсов
      document.querySelectorAll('.team').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.team__more').style.height = '0';
      })
      if (id) {
        let openedItem = document.querySelector('.team[data-id="' + id + '"]');
        let openedItemMore = openedItem.querySelector('.team__more');
        let openedItemInner = openedItem.querySelector('.team__more-inner');
        openedItem.classList.add('open');
        openedItemMore.style.height = openedItemInner.offsetHeight + 'px';
      }
    },
    deleteTeam: function (id) {
      this.$emit('deleteTeam', id);
    },
    deletePlayer: function (playerId, teamId) {
      let params = {
        playerId: playerId,
        teamId: teamId
      }
      this.$emit('deletePlayer', params);
    },
    setEditEnable(type, teamId, playerId) {
      let params = {
        type: type,
        teamId: teamId,
        playerId: playerId ? playerId : null,
      }
      this.$emit('setEditEnable', params);
    },
    isItemEditing: function (type, teamId, playerId) {
      let _this = this
      switch (type) {
        case 'team': {
          if (_this.editingTeamId === teamId) {
            return true;
          }
          break;
        }
        case 'player': {
          if (_this.editingPlayerId.teamId === teamId && _this.editingPlayerId.playerId === playerId) {
            return true;
          }
          break;
        }
        default: {
          return false
        }
      }
    },
    setEditDisable: function () {
      this.$emit('setEditDisable');
    },
    updateItem: function (type, event, teamId, playerId) {
      switch (type) {
        case 'team': {
          let newTeamName = event.target.closest('.team__header').querySelector('.team__header-title > input').value;
          let params = {
            type: type,
            teamId: teamId,
            name: newTeamName,
          }
          this.$emit('updateItem', params);
          break;
        }
        case 'player': {
          let newPlayerName = event.target.closest('.team__player').querySelector('.team__player-name > input').value;
          let newPosition = event.target.closest('.team__player').querySelector('.team__player-position > input').value;
          let newPlayerAge = event.target.closest('.team__player').querySelector('.team__player-age > input').value;
          let params = {
            type: type,
            teamId: teamId,
            playerId: playerId,
            name: newPlayerName,
            position: newPosition,
            age: newPlayerAge,
          }
          this.$emit('updateItem', params);
          break;
        }
        default: {
          break;
        }
      }
    },
    addTeam: function (event) {
      let nameInput = event.target.closest('.add').querySelector('.add__field > input');
      let name = nameInput.value;
      nameInput.value = "";
      this.$emit('addTeam', name);
    },
    addPlayer: function (event, teamId) {
      let nameInput = event.target.closest('.add').querySelector('.add__field--name > input');
      let positionInput = event.target.closest('.add').querySelector('.add__field--position > input');
      let ageInput = event.target.closest('.add').querySelector('.add__field--age > input');
      let params = {
        teamId: teamId,
        name: nameInput.value,
        position: positionInput.value,
        age: ageInput.value,
      }
      nameInput.value = "";
      positionInput.value = "";
      ageInput.value = "";
      this.$emit('addPlayer', params);
    }
  },
  mounted() {
    let _this = this
    if (this.activeTeamId) {
      setTimeout(function () {
        _this.openActiveItem(_this.activeTeamId);
      }, 500);
    }
  },
  watch: {
    activeTeamId: function () {
      this.openActiveItem(this.activeTeamId);
    },
  },
  updated() {
    this.openActiveItem(this.activeTeamId);
  },
}
</script>

<style scoped lang="scss">
.teams-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__header + &__content {
    margin-top: 30px;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 15px;

    &-title {
      & > h1 {
        margin: 0;
      }
    }

    &-subtitle {
      opacity: .6;
      font-size: 12px;
      padding-left: 6px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
  }
}

.team {
  $team: &;

  min-width: 400px;
  max-width: 100%;

  & + & {
    margin-top: 20px;
  }

  &__header, &__more-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 10px;
    border: 1px solid var(--main-grey);
    background-color: var(--main-white);
    box-shadow: 0 0 0 0 var(--main-grey);

    transition: border-color ease-in-out 300ms, box-shadow ease-in-out 300ms;
    will-change: box-shadow, border-color;
  }

  &__header {
    $header: &;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 15px;
    cursor: pointer;

    #{$team}--add & {
      cursor: initial;
    }

    &.editing {
      cursor: initial;
    }

    &:hover {
      border-color: var(--main-grey-border);
    }

    #{$team}.open & {
      box-shadow: 0 3px 5px 1px rgba(193, 199, 208, 0.3)
    }

    &-icon {
      display: flex;

      & > svg {
        fill: var(--main-black);
        transition: transform ease-in-out 300ms;
        will-change: transform;

        #{$team}.open & {
          transform: scale(1, -1);
        }
      }
    }

    &-title {
      display: flex;
      flex-grow: 1;
      justify-content: flex-start;

      & > input:read-only {
        cursor: inherit;
      }

      & > input {
        border: none;
        outline: none;
        text-align: start;
        padding: 6px 10px 5px;
        border-radius: 4px;
        border-bottom: 1px solid transparent;
        transition: background-color ease-in-out 300ms, border-color ease-in-out 300ms, border-radius ease-in-out 300ms;
      }

      #{$header}.editing & > input:focus {
        border-color: var(--main-blue-dark) !important;
        border-radius: 4px 4px 0 0;
      }

      #{$header}.editing & > input {
        background-color: var(--main-grey);
        border-color: var(--main-blue);
      }
    }

    &-actions {

    }
  }

  &__more {
    overflow: hidden;
    height: 0;
    padding-top: 0;
    opacity: 0;
    transition: padding-top ease-in-out 300ms, height ease-in-out 300ms, opacity ease-in-out 300ms;
    will-change: height;

    #{$team}.open & {
      padding-top: 10px;
      opacity: 1;
    }

    &-inner {
      align-items: flex-start;
      justify-content: flex-start;
      padding: 15px 15px 15px 40px;
    }
  }

  &__player {
    $player: &;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & + & {
      margin-top: 5px;
      padding-top: 5px;
      border-top: 1px solid var(--main-grey);
    }

    &-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & input:read-only {
        cursor: inherit;
      }

      & input {
        max-width: 100%;
        border: none;
        outline: none;
        text-align: start;
        padding: 6px 10px 5px;
        border-radius: 4px;
        border-bottom: 1px solid transparent;
        transition: background-color ease-in-out 300ms, border-color ease-in-out 300ms, border-radius ease-in-out 300ms;
      }

      #{$player}.editing & input:focus {
        border-color: var(--main-blue-dark) !important;
        border-radius: 4px 4px 0 0;
      }

      #{$player}.editing & input {
        background-color: var(--main-grey);
        border-color: var(--main-blue);
      }
    }

    * + &-name, * + &-position, * + &-age {
      margin-left: 15px;
    }

    &-position, &-age {
      max-width: 70px;

      & > input {
        max-width: 50px;
      }
    }

    &-actions {

    }
  }
}

.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 140px;

  &__item {
    display: flex;
    cursor: pointer;

    & > svg {
      // для обработки клика именно по .action__item
      pointer-events: none;
    }

    & + & {
      margin-left: 5px;
    }

    &--done, &--cancel {
      opacity: 0;
      pointer-events: none;

      .team__player.editing .team__player-actions &, .team__header.editing .team__header-actions & {
        opacity: 1;
        pointer-events: all;
      }
    }

    &--done {
      & > svg {
        fill: var(--main-green-light);
        transition: fill ease-in-out 150ms;
      }

      &:hover > svg {
        fill: var(--main-green);
      }
    }

    &--cancel {
      & > svg {
        stroke: var(--main-red-light);
        transition: stroke ease-in-out 150ms;
      }

      &:hover > svg {
        stroke: var(--main-red);
      }
    }

    &--plus {
      & > svg {
        stroke: var(--main-green-light);
        transition: stroke ease-in-out 150ms;
      }

      &:hover > svg {
        stroke: var(--main-green);
      }
    }

    &--edit {
      .team__player.editing .team__player-actions &, .team__header.editing .team__header-actions & {
        display: none;
      }
    }

    &--edit, &--delete {
      & > svg {
        fill: var(--main-grey-border);
        transition: fill ease-in-out 150ms;
      }

      &:hover > svg {
        fill: var(--main-black);
      }
    }
  }
}

.add {
  $add: &;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &--team {
    min-width: 400px;
    max-width: 100%;
    padding: 15px 15px 15px 40px;

    border-radius: 10px;
    border: 1px solid var(--main-grey);
    background-color: var(--main-white);
    box-shadow: 0 0 0 0 var(--main-grey);

    transition: border-color ease-in-out 300ms, box-shadow ease-in-out 300ms;
    will-change: box-shadow, border-color;
  }

  &--player {
    border-top: 1px solid var(--main-grey);
    padding-top: 10px;

    #{$add}__field--position, #{$add}__field--age {
      max-width: 70px;

      & > input {
        max-width: 50px;
      }
    }

    #{$add}__field + #{$add}__field {
      margin-left: 15px;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  * + & {
    margin-top: 20px;
  }

  & input:read-only {
    cursor: inherit;
  }

  & input {
    max-width: 100%;
    border: none;
    outline: none;
    text-align: start;
    padding: 6px 10px 5px;
    border-radius: 4px;
    border-bottom: 1px solid transparent;
    transition: background-color ease-in-out 300ms, border-color ease-in-out 300ms, border-radius ease-in-out 300ms;
  }

  & input:focus {
    border-color: var(--main-blue-dark) !important;
    border-radius: 4px 4px 0 0;
  }

  & input {
    background-color: var(--main-grey-light);
    border-color: var(--main-blue);
  }
}
</style>
