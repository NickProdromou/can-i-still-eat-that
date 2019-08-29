export default function isUploadTask(task: any): task is firebase.storage.UploadTask {
  return task && task !== null;
}
