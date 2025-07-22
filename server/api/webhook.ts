export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization');
  console.log('Authorization header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token de autenticación no proporcionado.',
    });
  }
  const token = useRuntimeConfig(event).callback_secret_token;
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token de callback no proporcionado.',
    });
  }

  if (authHeader !== `Bearer ${token}`) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Token de callback inválido.',
    });
  }

  //   const formData = await readMultipartFormData(event);
  // 1. Extract the JSON file from the form data
  // 2. Save the JSON file to S3
  // 3. Notify the user about the transcription result
});
