import {Reminders} from '../reminders'
import {Popup} from './popup'

export class TimeTracker {
  private _popup: Popup
  private _timeTracker: HTMLDivElement

  public constructor(private _reminders: Reminders) {
    this._popup = new Popup(_reminders)
    this._timeTracker = this._buildTimeTracker()
  }

  private _buildTimeTracker() {
    const timeTracker = document.createElement('div')
    timeTracker.addEventListener('keydown', (event) => {
      event.stopImmediatePropagation()
    })
    timeTracker.classList.add('time-tracker')

    const {label, input} = this._buildDayInput()
    timeTracker.appendChild(label)
    timeTracker.appendChild(input)
    timeTracker.appendChild(this._buildPopupButton())
    this._popup.append(timeTracker)

    return timeTracker
  }

  private _buildDayInput() {
    const label = document.createElement('label')
    label.setAttribute('for', 'time-tracker-days')
    label.textContent = 'Day '

    const input = document.createElement('input')
    input.type = 'number'
    input.id = 'time-tracker-days'
    input.size = 4
    input.value = this._reminders.currentDay.toString()
    input.addEventListener('change', () => {
      let day = Number(input.value)
      if (day <= 1) {
        day = 1
        input.value = '1'
      }

      void this._reminders.changeDay(day)
    })

    return {label, input}
  }

  private _buildPopupButton() {
    const button = document.createElement('button')
    button.classList.add('reminders-toggle')
    button.addEventListener('click', (event) => {
      event.stopImmediatePropagation()
      this._popup.toggle()
    })

    return button
  }

  public prepend(parent: Element): void {
    parent.prepend(this._timeTracker)
  }
}