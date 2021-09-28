<template>
  <div id="app">
    <TeamsList />
  </div>
</template>

<script>
import TeamsList from "./components/TeamsList.vue";

export default {
  name: "App",
  components: {
    TeamsList,
  },
};
</script>

<style lang="scss">
body {
  min-height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;

  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
  width: 100%;

  background-image: url(./assets/bg.jpg);
  background-position: center top;
  background-size: cover;
}
</style>
