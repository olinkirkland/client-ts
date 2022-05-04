import { SectionType } from './PopupBook';

export const cookie = {
  title: 'We use cookies.',
  sections: [
    {
      type: SectionType.BODY,
      data: 'We use cookies to improve your experience. We do not use cookies for advertising. By continuing to use this site, you agree to our use of cookies.'
    }
  ],
  okButton: 'Accept and continue',
  onClose: () => {
    localStorage.setItem('cookie-popup-viewed', 'true');
  }
};
