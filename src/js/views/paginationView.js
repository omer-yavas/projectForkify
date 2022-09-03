import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    console.log(this._data.page);
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //Page is 1 and there are other pages
    if (numPages > 1 && this._data.page === 1) {
      return this._generateMarkupButton('next', curPage);
    }
    //Last page
    if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }
    //cok sayfa ara
    if (this._data.page < numPages) {
      return this._generateMarkupButton('both', curPage);
    }

    return ' ';
  }

  _generateMarkupButton(prevOrNext, curPage) {
    const previous = `<button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${curPage - 1}</span>
      </button>`;
    const next = `<button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button>`;
    if (prevOrNext === 'prev') return previous;
    if (prevOrNext === 'next') return next;
    if (prevOrNext === 'both') return `${previous} ${next}`;
  }
}

export default new PaginationView();
