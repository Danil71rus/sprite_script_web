<template>
  <div id="app">
    <div id="nav">
      <router-link to="/compress">Оптимизация png</router-link> |
      <router-link to="/about">Ещё</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
    width: 100%;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
}

#nav {
    padding: 30px;
    width: 100%;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
