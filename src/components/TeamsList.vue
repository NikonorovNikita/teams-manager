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
      <div v-for="team in teams" v-bind:key="team.key" class="team" v-bind:class="{ editing: isItemEditing(team.id) }" :data-id="team.id">
        <div class="team__header" v-on:click="handleOpenItem(team.id, $event)">
          <div class="team__header-icon">
            <IconArrow/>
          </div>
          <div class="team__header-title">
            <input type="text" :value="team.name" readonly>
          </div>
          <div class="team__header-actions">
            <div class="actions">
              <div class="actions__item actions__item--done">
                <IconDone/>
              </div>
              <div class="actions__item actions__item--cancel">
                <IconCancel/>
              </div>
              <div class="actions__item actions__item--edit" v-on:click="setEditEnable(team.id)">
                <IconEdit/>
              </div>
              <div class="actions__item actions__item--delete"
                   v-on:click="deleteTeam('team' ,team.id)">
                <IconTrash/>
              </div>
            </div>
          </div>
        </div>
        <div class="team__more">
          <div class="team__more-inner">
            <div v-if="team.roster" class="team__roster">
              <div v-for="player in team.roster" v-bind:key="player.key" class="team__player" :data-id="player.id">
                <div class="team__player-info">
                  <div class="team__player-name">
                    <input type="text" :value="player.name" placeholder="Имя" readonly>
                  </div>
                  <div class="team__player-position">
                    <input type="text" :value="player.position" placeholder="Поз." readonly>
                  </div>
                  <div class="team__player-age">
                    <input type="text" :value="player.age" placeholder="Возраст" readonly>
                  </div>
                </div>
                <div class="team__player-actions">
                  <div class="actions">
                    <div class="actions__item actions__item--done">
                      <IconDone/>
                    </div>
                    <div class="actions__item actions__item--cancel">
                      <IconCancel/>
                    </div>
                    <div class="actions__item actions__item--edit">
                      <IconEdit/>
                    </div>
                    <div class="actions__item actions__item--delete" v-on:click="deletePlayer(player.id,team.id)">
                      <IconTrash/>
                    </div>
                  </div>
                </div>
              </div>
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

export default {
  name: 'TeamsList',
  components: {
    IconArrow,
    IconDone,
    IconCancel,
    IconEdit,
    IconTrash,
  },
  props: {
    teams: Array,
    activeTeamId: [Number, Boolean],
    editingTeamId: [Number, Boolean],
    editingPlayerId: [Number, Boolean],
  },
  computed: {},
  methods: {
    handleOpenItem: function (id, event) {
      if (!event.target.classList.contains('actions__item')) {
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
    isItemEditing: function (id) {
      return (id === this.activeTeamId)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  transition: border-color;
  will-change: border-color;

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

      & > input {
        text-align: start;
      }

      & > input:read-only {
        cursor: inherit;
      }

      & > input, & > input:focus, & > input:active {
        border: none;
        outline: none;
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

      & input {
        text-align: start;
      }

      & input:read-only {
        cursor: inherit;
      }

      & input, & input:focus, & input:active {
        border: none;
        outline: none;
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

      .player.edit &, .team.edit & {
        opacity: 1;
        pointer-events: all;
      }
    }

    &--done, &--edit, &--delete {
      & > svg {
        fill: var(--main-grey-border);
        transition: fill ease-in-out 150ms;
      }

      &:hover > svg {
        fill: var(--main-black);
      }
    }

    &--cancel {
      & > svg {
        stroke: var(--main-grey-border);
      }

      &:hover > svg {
        stroke: var(--main-black);
      }
    }
  }
}
</style>
