import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  toHTML() {
    return `
      <input type="text" class="excel__header-input" value="Новая таблица">
  
      <div>
          <div class="excel__header-button">
              <span class="material-icons">delete</span>
          </div>
          <div class="excel__header-button">
              <span class="material-icons">exit_to_app</span>
          </div>
      </div>
    `
  }
}
