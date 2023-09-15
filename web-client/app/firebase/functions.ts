import {getFunctions, httpsCallable} from "firebase/functions";

const functions = getFunctions();

const generateUploadURL = httpsCallable(functions, 'generateUploadURL');

export async function uploadVideo(file: File) {

  const response: any = await generateUploadURL({
    fileExtension: file.name.split('.').pop()
  });

  // Upload the file via the signed URL
  await fetch(response?.data?.url, {
    method: "PUT",
    body: file,
    headers: {
      'Content-Type': file.type
    }
  });
  return;
}