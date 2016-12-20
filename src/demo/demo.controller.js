function DemoCtrl() {

  // ViewModel
  const vm = this;

  vm.title = 'Use this for demo-ing your component';

  vm.exampleGiven = 'Hello world!';
}

export default {
  name: 'DemoCtrl',
  fn: DemoCtrl
};
