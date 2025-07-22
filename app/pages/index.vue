<template>
  <div>
    <authenticator />
    <div
      v-if="auth.route === 'authenticated'"
      class="p-5 flex flex-col"
    >
      <button
        class="text-right"
        @click="auth.signOut"
      >
        Sign out
      </button>

      <div
        class="container flex flex-col items-center justify-center min-h-screen"
      >
        <h1 class="mb-20 text-3xl font-bold">
          Hello, {{ auth.user?.username }}!
        </h1>

        <AudioFileTranscribe />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';

  import '@aws-amplify/ui-vue/styles.css';

  const auth = useAuthenticator();
</script>
