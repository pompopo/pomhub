export function getIssueNumber(url) {
  return url.split('/').slice(-1);
}
