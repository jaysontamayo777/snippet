export function redirectToPayment(redirectUrl) {
  document.getElementById('doku-form').setAttribute('action', redirectUrl);
  document.getElementById('doku-form').submit();
}
