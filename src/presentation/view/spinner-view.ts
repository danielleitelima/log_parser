import { createSpinner, Spinner } from 'nanospinner';

export default class SpinnerView {
  spinner: Spinner;
  
  constructor() {
    this.spinner = createSpinner("Loading...");
  }
  
  show() {
    this.spinner.start();
  }
  
  hide() {
    this.spinner.stop();
  }
}