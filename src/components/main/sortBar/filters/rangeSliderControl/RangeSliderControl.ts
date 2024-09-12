import './rangeSliderControl.scss';
import Filters from 'components/main/sortBar/filters/Filters';
import { IValueRange } from 'types/interfaces';

class RangeSliderControl {
  parentElement: HTMLElement;

  min: number;

  max: number;

  char: string;

  minCurrentValue: number;

  maxCurrentValue: number;

  colorLineBg: string;

  colorLineActive: string;

  sliderControl: HTMLDivElement;

  fromSlider: HTMLInputElement;

  toSlider: HTMLInputElement;

  formControl: HTMLDivElement;

  formValueLeft: HTMLDivElement;

  formValueRight: HTMLDivElement;

  constructor(parentElement: HTMLElement, valueData: IValueRange, char: string, private filters: Filters) {
    this.parentElement = parentElement;
    this.min = valueData.min;
    this.max = valueData.max;
    this.minCurrentValue = valueData.minCurrent;
    this.maxCurrentValue = valueData.maxCurrent;
    this.char = char;

    this.colorLineBg = '#ACACAC';
    this.colorLineActive = '#0156FF';

    this.sliderControl = document.createElement('div');
    this.fromSlider = document.createElement('input');
    this.toSlider = document.createElement('input');
    this.formControl = document.createElement('div');
    this.formValueLeft = document.createElement('div');
    this.formValueRight = document.createElement('div');

    this.appendRangeSliderControl();

    this.setToggleAccessible(this.toSlider);

    this.fillSlider(this.fromSlider, this.toSlider, this.colorLineBg, this.colorLineActive);
  }

  appendRangeSliderControl() {
    this.sliderControl.classList.add('sliders-control');
    this.parentElement.append(this.sliderControl);

    this.fromSlider.setAttribute('type', 'range');
    this.fromSlider.setAttribute('min', `${this.min}`);
    this.fromSlider.setAttribute('max', `${this.max}`);
    this.fromSlider.setAttribute('value', `${this.minCurrentValue}`);
    this.fromSlider.id = 'from-slider';
    this.sliderControl.append(this.fromSlider);

    this.toSlider.setAttribute('type', 'range');
    this.toSlider.setAttribute('min', `${this.min}`);
    this.toSlider.setAttribute('max', `${this.max}`);
    this.toSlider.setAttribute('value', `${this.maxCurrentValue}`);
    this.sliderControl.append(this.toSlider);

    this.formControl.classList.add('form-control');
    this.parentElement.append(this.formControl);

    this.formValueLeft.classList.add('form-control__value');
    this.formValueLeft.innerText = `${this.char} ${this.minCurrentValue !== Infinity ? this.minCurrentValue : '0'}`;
    this.formControl.append(this.formValueLeft);

    this.formValueRight.classList.add('form-control__value');
    this.formValueRight.innerText = `${this.char} ${this.maxCurrentValue > 0 ? this.maxCurrentValue : '0'}`;
    this.formControl.append(this.formValueRight);
  }

  // Left controller
  controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, formValueLeft: HTMLDivElement) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, this.colorLineBg, this.colorLineActive);

    if (from > to) {
      fromSlider.value = `${to}`;
      formValueLeft.innerText = `${this.char} ${to}`;
      this.minCurrentValue = to;
    } else {
      formValueLeft.innerText = `${this.char} ${from}`;
      this.minCurrentValue = from;
    }
  }

  // Right controller
  controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, formValueRight: HTMLDivElement) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, this.colorLineBg, this.colorLineActive);
    this.setToggleAccessible(toSlider);

    if (from <= to) {
      toSlider.value = `${to}`;
      formValueRight.innerText = `${this.char} ${to}`;
      this.maxCurrentValue = to;
    } else {
      formValueRight.innerText = `${this.char} ${from}`;
      this.maxCurrentValue = from;
      toSlider.value = `${from}`;
    }
  }

  getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
    const from: number = parseInt(currentFrom.value, 10);
    const to: number = parseInt(currentTo.value, 10);
    return [from, to];
  }

  fillSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, sliderColor: string, rangeColor: string) {
    const rangeDistance = Number(toSlider.max) - Number(toSlider.min);
    const fromPosition = Number(fromSlider.value) - Number(toSlider.min);
    const toPosition = Number(toSlider.value) - Number(toSlider.min);
    toSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
      ${sliderColor} 100%)`;
  }

  setToggleAccessible(currentTarget: HTMLInputElement) {
    if (Number(currentTarget.value) <= 0) {
      this.toSlider.style.zIndex = '2';
    } else {
      this.toSlider.style.zIndex = '0';
    }
  }
}

export default RangeSliderControl;
