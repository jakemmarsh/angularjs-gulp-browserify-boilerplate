let example = {
  templateUrl: 'component.html',
  controller: exampleCtrl,
  controllerAs: 'vm',
  bindings: {
    exampleValue: '<'
  }
};

export default {
  name: 'exampleComponent',
  fn: example
};

function exampleCtrl(){
  const vm = this;

  vm.$onInit = function() {
    vm.initialized = true;
  }

  vm.$onChanges = function(changes) {
    if(changes.exampleValue && changes.exampleValue.currentValue) {
      vm.displayValue = changes.exampleValue.currentValue;
    }
  }
}
