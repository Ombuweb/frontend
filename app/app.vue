<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  import { Amplify } from 'aws-amplify';
  import outputs from '../amplify_outputs.json';

  Amplify.configure(outputs);
</script>
