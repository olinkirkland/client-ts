export function garbageCollectModals() {
  setTimeout(() => {
    const modals = document.querySelectorAll('.ReactModalPortal');
    for (let i = 0; i < modals.length; i++) {
      const m = modals[i];
      if (m.children.length === 0) m.remove();
    }
  }, 1000);
}

export function numberComma(n: number): string {
  // Add a comma to a number (e.g. 1234567 -> 1,234,567)
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}