export const getS3PresignedUrl = async (
  presignedURLApiUrl: string,
  fileName: string,
  fileType: string,
  userId: string
): Promise<string> => {
  if (!presignedURLApiUrl) {
    throw new Error('Presigned URL API endpoint is not configured.');
  }

  try {
    const response = await fetch(presignedURLApiUrl, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName,
        fileType,
        userId,
      }),
    });

    if (response.statusText !== 'OK') {
      throw new Error(`Failed to get presigned URL: ${response.statusText}`);
    }

    const data = await response.json();
    return data.uploadUrl;
  } catch (error) {
    console.error('Error fetching presigned URL:', error);
    throw new Error('Error fetching presigned URL');
  }
};
