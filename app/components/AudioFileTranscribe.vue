<template>
  <div>
    <UFormField
      label="Subir Audio"
      name="audioFile"
      class="mb-4"
    >
      <UInput
        :key="fileInputKey"
        type="file"
        accept="audio/*"
        @change="handleFileChange"
      />
    </UFormField>
    <div v-if="audioFile">
      <p>Selected File: {{ audioFile.name }}</p>
      <p>File Size: {{ convertSizeToMB(audioFile.size) }} MB</p>
      <p
        v-if="error"
        class="text-red-500"
      >
        {{ error }}
      </p>
    </div>
    <div class="flex space-x-2 mt-4">
      <UButton
        :disabled="isSubmitDisabled"
        class=""
        @click="uploadFile"
        >Transcribe</UButton
      >
      <UButton
        type="reset"
        :disabled="!audioFile"
        @click="resetForm"
        >Reset</UButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { fetchAuthSession } from 'aws-amplify/auth';

  const audioFile = ref<File | null>(null);
  const error = ref<string | null>(null);
  const fileInputKey = ref(0); // Used to reset the file input

  const convertSizeToMB = (size: number) => (size / (1024 * 1024)).toFixed(2);

  const isSubmitDisabled = computed(
    () => !audioFile.value /*|| +convertSizeToMB(audioFile.value.size) > 20*/
  );

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      audioFile.value = file as File;
      validateFileSize(file?.size ? file.size : 0);
    }
  }

  async function uploadFile() {
    if (!audioFile.value) {
      error.value = 'No file selected.';
      return;
    }

    try {
      const userSession = await fetchAuthSession();

      if (!userSession.tokens?.accessToken) {
        error.value = 'User is not authenticated.';
        return;
      }

      const formData = new FormData();
      formData.append('audioFile', audioFile.value);

      const response = await fetch('/api/transcriptions', {
        headers: {
          Authorization: `Bearer ${userSession.tokens.idToken}`,
        },
        method: 'POST',
        body: formData,
      });

      if (response.statusText !== 'OK') {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log('File uploaded successfully:', data);
    } catch (err) {
      console.error('Error uploading file:', err);
      error.value =
        err instanceof Error
          ? err.message
          : 'An error occurred while uploading the file.';
    }
  }

  function validateFileSize(size: number) {
    if (+convertSizeToMB(size) > 20) {
      error.value = 'El archivo no puede ser mayor a 20 MB.';
    } else {
      error.value = null;
    }
  }

  function resetForm() {
    audioFile.value = null;
    error.value = null;
    fileInputKey.value += 1; // Reset the file input by changing its key
  }
</script>
