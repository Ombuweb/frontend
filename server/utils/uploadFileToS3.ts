export const uploadFileToS3 = async (presignedUrl: string, file: File) => {
  try {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(
      'Error uploading file: ' +
        (error instanceof Error ? error.message : 'Unknown error')
    );
  }
};
