export class NotFoundPage {
  async render() {
    const elm = document.createElement('div');
    elm.id = 'not-found';
    elm.innerHTML = `
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    `;
    return elm;
  }
}