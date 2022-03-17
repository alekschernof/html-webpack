export default function logout(res) {
  if (res.status === 401) {
    window.localStorage.clear();
  }
}
