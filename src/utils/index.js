function doCopy() {
  return new Promise((resove, reject) => {
    setTimeout(() => {
      const copyword = document.execCommand('copy');
      if (copyword) {
        resove(copyword);
      } else {
        reject();
      }
    }, 500);
  });
}

export async function copyTxt(val) {
  let input_dom = document.createElement('input');
  input_dom.value = val;
  input_dom.style.opacity = '0';
  input_dom.readOnly = 'readonly';
  document.body.appendChild(input_dom);
  input_dom.select();
  const copyword = await doCopy();
  document.body.removeChild(input_dom);
  if (copyword) {
    return true;
  }
  return false;
}

export function makePhoneCall(phoneNumber) {
  window.location.href = `tel:${phoneNumber}`;
}

export function getLocale() {
  return localStorage.locale || 'zh-CN';
}
