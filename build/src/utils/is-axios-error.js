export default function isAxiosError(error) {
  return error.isAxiosError ? error : false;
}