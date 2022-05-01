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
  if (!n) n = 0;
  // Add a comma to a number (e.g. 1234567 -> 1,234,567)
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function experienceNeededFromLevel(level: number): number {
  // 100 + (x/7)^2
  return Math.round(100 + Math.pow(level / 7, 2));
}

export function validateEmail(email: string): boolean {
  // Validate email
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
