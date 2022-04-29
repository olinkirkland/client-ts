export function garbageCollectModals() {
  const modals = document.querySelectorAll('.ReactModalPortal');
  for (let i = 0; i < modals.length; i++) modals[i].remove();
}
