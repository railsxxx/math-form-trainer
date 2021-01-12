<template>
  <router-view />
  <div id="nav">
    <router-link :to="{ name: 'Home' }">Home</router-link> |
    <router-link :to="{ name: 'Rules' }">Rules</router-link>
  </div>
</template>