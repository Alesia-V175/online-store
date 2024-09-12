import './copyLinkButton.scss';

class CopyLinkButton {
  public render(): void {
    const parentElement = document.querySelector('#copy-button') as HTMLElement;
    const copyButton: HTMLButtonElement = document.createElement('button');
    copyButton.classList.add('copy-button');
    copyButton.innerText = 'Copy Link';

    parentElement.innerHTML = '';
    parentElement.append(copyButton);

    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      copyButton.innerText = 'Copied!';
      setTimeout(() => {
        copyButton.innerText = 'Copy Link';
      }, 300);
    });
  }
}

export default CopyLinkButton;
