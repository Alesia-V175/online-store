import { Container } from 'constants/htmlConstants';
import './errorPage.scss';

class ErrorPage {
  constructor(private container: HTMLElement = Container) {
    this.renderPage();
  }

  public renderPage(): void {
    const errorPageContainer: HTMLElement = document.createElement('div');
    errorPageContainer.classList.add('error');
    errorPageContainer.innerHTML = `
      <div class="error__descr">
        <p>Error 404!</p>
        <span>Something went wrong...</span>
      </div>
      `;
    this.container.append(errorPageContainer);
  }

  public removePage(): void {
    this.container.innerHTML = '';
  }
}

export default ErrorPage;
