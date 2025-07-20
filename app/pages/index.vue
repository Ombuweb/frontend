<template>
  <div>
    <authenticator />
    <template v-if="auth.route === 'authenticated'">
      <h1>Hello {{ auth.user?.username }}!</h1>
      <button @click="auth.signOut">Sign out</button>
    </template>
  </div>
</template>
<script setup lang="ts">
  import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';

  import '@aws-amplify/ui-vue/styles.css';

  const auth = useAuthenticator();
</script>
