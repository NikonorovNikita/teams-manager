<template>
  <div id="app">
    <div class="teams-manager">
      <div class="teams-manager__background">
        <img src="./assets/bg.jpg" alt="">
      </div>
      <div class="teams-manager__content">
        <TeamsList :teams="teams" :activeTeamId="activeTeamId" :editingTeamId="editingTeamId"
                   :editingPlayerId="editingPlayerId"
                   v-on:openItem="onOpenItem" v-on:deleteTeam="onDeleteTeam" v-on:deletePlayer="onDeletePlayer"
                   v-on:setEditEnable="onSetEditEnable" v-on:setEditDisable="onSetEditDisable"
                   v-on:updateItem="onUpdateItem" v-on:addTeam="onAddTeam" v-on:addPlayer="onAddPlayer"/>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import TeamsList from "./components/TeamsList.vue"

export default {
  name: "App",
  components: {
    TeamsList,
  },
  computed: {
    ...mapState([
      'teams',
      'activeTeamId',
      'editingTeamId',
      'editingPlayerId',
    ])
  },
  methods: {
    ...mapActions([
      'openItem',
      'deleteTeam',
      'deletePlayer',
      'setEditEnable',
      'setEditDisable',
      'updateItem',
      'addTeam',
      'addPlayer',
    ]),
    onOpenItem: function (id) {
      this.openItem(id);
    },
    onDeleteTeam: function (id) {
      this.deleteTeam(id);
    },
    onDeletePlayer: function (params) {
      this.deletePlayer(params);
    },
    onSetEditEnable: function (params) {
      this.setEditEnable(params);
    },
    onSetEditDisable: function () {
      this.setEditDisable();
    },
    onUpdateItem: function (params) {
      this.updateItem(params);
    },
    onAddTeam: function (name) {
      this.addTeam(name);
    },
    onAddPlayer: function (params) {
      this.addPlayer(params);
    }
  }
};
</script>

<style lang="scss">
:root {
  --main-white: #FFFFFF;
  --main-black: #323B4B;
  --main-black-dark: #000000;

  --main-grey-middle: #C1C7D0;
  --main-grey: #F3F3F3;
  --main-grey-light: #FAFBFC;

  --main-grey-border: #E3E3E3;

  --main-green: #38CB89;
  --main-green-light: #A5E1BF;

  --main-red: #D83232;
  --main-red-light: #FC9595;

  --main-blue-dark: #5B7FFF;
  --main-blue: #E1ECFF;
  --main-blue-light: #F4F8FF;
}

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--main-black);
}

.teams-manager {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  &__background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 50%;
    z-index: -1;
    background-color: #00004b;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100%;
      background: rgb(255, 255, 255);
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
    }

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right top;

      opacity: .6;
    }
  }

  &__content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    padding: 80px 25px 25px;
  }
}
</style>
