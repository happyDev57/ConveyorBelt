import Worker from './worker.js';
import { COMPONENT_A, COMPONENT_B, EMPTY_SLOT, PRODUCT } from './constants.js';

class ConveyorBelt {
  constructor(props) {
    this.result = {};
    this.workerPairs = [];
    this.numberOfSlots = props?.numberOfSlots || 3;
    this.slots = Array(this.numberOfSlots).fill(EMPTY_SLOT);
  }

  setWorkers() {
    for (let i = 0; i < this.slots.length; i++) {
      const workerAbove = new Worker();
      const workerBelow = new Worker();
      this.workerPairs.push([workerAbove, workerBelow]);
    }
  }

  displayResult() {
    console.log('Results:');
    Object.entries(this.result).forEach((item) => {
      console.log('\n', item[0] + ': ' + item[1]);
    });
  }

  displayStepProgress(stepIndex, before) {
    console.log(stepIndex, ...before, '->', ...this.slots, '\n');
    const above = [];
    const below = [];
    this.workerPairs.forEach((pair) => {
      pair.forEach((worker, idx) => {
        if (idx) {
          below.push(
            [worker.items.join(''), worker.assembling ? 'wait:' + worker.timeLeftToAssemble : ''].join(' ').padEnd(10),
          );
        } else {
          above.push(
            [worker.items.join(''), worker.assembling ? 'wait:' + worker.timeLeftToAssemble : ''].join(' ').padEnd(10),
          );
        }
      });
    });
    console.log(above.join(' | '));
    const maxLength = this.numberOfSlots * 13;
    console.log(''.padStart(maxLength, '-'));
    console.log(below.join(' | '), '\n\n');
  }

  run(steps = 100) {
    const slotItems = [COMPONENT_A, COMPONENT_B, EMPTY_SLOT];

    this.setWorkers();

    for (let i = 1; i <= steps; i++) {
      // Remove the last slot. Log to the result.
      const lastSlot = this.slots.pop();
      if (lastSlot !== EMPTY_SLOT) {
        this.result[lastSlot] = (this.result[lastSlot] || 0) + 1;
      }

      // Add slot with an item.
      const index = Math.floor(Math.random() * (3 - 1 + 1) + 1);
      this.slots.unshift(slotItems[index - 1]);

      // Remember slots status to display progress
      const before = Array.from(this.slots);

      this.workerPairs.forEach((pair, index) => {
        let busySlot = false;

        pair.forEach((worker) => {
          worker.step();

          if (busySlot) return;

          if (this.slots[index] === EMPTY_SLOT) {
            if (worker.items[0] === PRODUCT) {
              worker.returnProduct();
              this.slots[index] = PRODUCT;
              busySlot = true;
            }
            return;
          }

          if (worker.canTakeItemFromSlot(this.slots[index])) {
            worker.takeItem(this.slots[index]);
            this.slots[index] = EMPTY_SLOT;
            busySlot = true;
          }
        });
      });

      this.displayStepProgress(i, before);
    }

    this.displayResult();
  }
}

export default ConveyorBelt;
