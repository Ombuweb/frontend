export default defineEventHandler(async (event) => {
  // Get token from headers
  const token = getHeader(event, 'Authorization')?.replace('Bearer ', '');
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token de autenticación no proporcionado.',
    });
  }

  const userId: string | null = await getAuthenticatedUserId(token);
  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Usuario no autenticado.',
    });
  }

  const formData = await readMultipartFormData(event);
  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No se ha subido ningún archivo.',
    });
  }

  const file = formData.find((item) => item.name === 'audioFile');

  // Validate file size
  if (file && file.data.byteLength > 20 * 1024 * 1024) {
    throw createError({
      statusCode: 400,
      statusText: 'El archivo no puede ser mayor a 20 MB.',
    });
  }
  const { presignedUrlApiUrl } = useRuntimeConfig(event).public;

  console.log('File type', file?.type);
  try {
    const presignedUrl = await getS3PresignedUrl(
      presignedUrlApiUrl,
      file?.filename ?? '',
      file?.type ?? '',
      userId
    );
    if (!presignedUrl) {
      throw createError({
        statusCode: 500,
        statusMessage: 'No se pudo obtener la URL prefirmada.',
      });
    }
    if (!file?.data || !file?.filename || !file?.type) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No se ha proporcionado un archivo válido.',
      });
    }

    const response = await uploadFileToS3(
      presignedUrl,
      new File([file.data], file.filename, { type: file.type })
    );
    console.log('Upload response:', response);
  } catch (error) {
    console.error('Error al obtener la URL prefirmada:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error al obtener la URL prefirmada.',
    });
  }
});
