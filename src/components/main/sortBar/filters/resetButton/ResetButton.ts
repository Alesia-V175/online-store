import './resetButton.scss';
import UrlHash from 'helpers/router/UrlHash';

class ResetButton {
  public render(): void {
    const parentElement = document.querySelector('#reset-button') as HTMLElement;
    const resetButton: HTMLButtonElement = document.createElement('button');
    resetButton.classList.add('reset-button');
    resetButton.innerText = 'Clear Filter';

    parentElement.innerHTML = '';
    parentElement.append(resetButton);

    resetButton.addEventListener('click', () => {
      UrlHash.clearHash();
    });
  }
}

export default ResetButton;
